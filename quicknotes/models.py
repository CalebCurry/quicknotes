from django.db import models

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return self.title

    def __repr__(self):
        return self.__str__()