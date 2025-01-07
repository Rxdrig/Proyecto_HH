from django.contrib import admin
from .models import *

# Register your models here.
class ComentarioAdmin(admin.ModelAdmin):
    list_display = ['contenidos','fecha','autor','autor.foto']
    search_fields = ['contenidos']
    list_per_page = 4

admin.site.register(Usuario)
admin.site.register(Comentario)
admin.site.register(Feedback)
