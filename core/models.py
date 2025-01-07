from django.db import models

# Create your models here.

class Usuario(models.Model):
    nombre = models.CharField(max_length=80)
    nombre_usuario = models.CharField(max_length=90, unique=True) 
    contraseña = models.CharField(max_length=250)
    correo_electronico = models.EmailField(max_length=140, unique=True)
    foto = models.ImageField(null=True,blank=True)

    def __str__(self):
        return self.nombre


class Comentario(models.Model):
    contenidos = models.TextField(max_length=250)
    fecha = models.DateField(auto_now_add=True)
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="comentarios")

    def __str__(self):
        return self.contenidos

    @property
    def foto_usuario(self):
        return self.autor.foto  # Accede a la foto del autor del comentario


class Feedback(models.Model):
    contenidos = models.TextField(max_length=250)
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.contenidos   

