from django.db import models

# Create your models here.
class Bug(models.Model):
    bugId = models.CharField(max_length=30)
    bugDesc = models.TextField()

    def __str__(self):
        return self.bugId

