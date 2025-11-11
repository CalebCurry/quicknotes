from django.conf import settings
from django.http import HttpResponse, JsonResponse

from quicknotes.serializers import CollectionSerializer, CollectionWithNotesSerializer, NoteSerializer, UserSerializer
from .models import Collection, Note
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response 
from rest_framework.decorators import action, api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from openai import OpenAI

client = OpenAI(api_key=settings.OPENAI_KEY)

def home(request):
    return HttpResponse("Welcome Home!!!!")

@api_view(["POST"])
def ai(request):
    title = request.data.get("title")
    content = request.data.get("content")
    
    completions = client.chat.completions.create(model="gpt-4", messages=[
        { 
            "role": "system",
            "content": "Briefly summarize the content"
        },
        {
            "role": "user",
            "content": content
        }
    ])

    response = completions.choices[0].message.content

    return Response({"data": response})

@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user: User = serializer.save() #type: ignore

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        return Response(
            {
                "user": UserSerializer(user).data,
                "refresh": str(refresh),
                "access": str(access)
            }, 
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NoteViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    
    def get_queryset(self):
        qs = Note.objects.filter(user=self.request.user).select_related("collection")
        collection_id = self.request.query_params.get("collection_id") #type: ignore
        if collection_id:  
            qs = qs.filter(collection_id=collection_id)
        return qs.order_by("id")
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({"data": serializer.data})
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

class CollectionViewSet(ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    def get_queryset(self):
        return Collection.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({"data": serializer.data})
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({"data": serializer.data})
    
    @action(detail=True, methods=["GET"])
    def notes(self, request, pk=None):
        collection = Collection.objects.prefetch_related("notes").filter(user=self.request.user).get(pk=pk)

        serializer = CollectionWithNotesSerializer(collection)
        return Response({"data": serializer.data})