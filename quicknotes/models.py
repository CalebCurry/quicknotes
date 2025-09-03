from django.db import models

class Collection(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.__str__()
    

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()

    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name="notes", null=True)

    def __str__(self):
        return self.title

    def __repr__(self):
        return self.__str__()
    
