from django.urls import path
from .views import *


urlpatterns = [
	path('', index, name="index"), # BASE
    
	# menu / pages
    path('categories-souls.html/', categoriassouls, name="categoriassouls"), #categories grid (builds?)
    path('categories-elden.html/', categoriaselden, name="categoriaselden"), 
    path('builds/', builds, name="builds"), #categories list (rutas farmeo?)
    path('contact.html/', contacto, name="contacto"), #contacto (feedback)
    path('typography.html/', typography, name="typography"), #tipografias
    path('comunidad/', comunidad, name="comunidad"), #Post default (comunidad)
    path('details-post-gallery.html/', postgallery, name="postgallery"), #Post gallery (galeria de fotos)
    path('details-post-review.html/', postreview, name="postreview"), #Post review (stats builds/armas?)
    path('login/', login, name="login"),
    path('registrarUsuario/', registrarUsuario, name="registrarUsuario"),
    path('logout/', logout_view, name='logout'),
    path('enviar-feedback/', enviar_feedback, name='enviar_feedback'),
    path('comentar/', comentar, name='comentar'),
    path('deletecomentario/<id>/', deletecomentario, name="deletecomentario" ),



    # Builds
    path('build-alastor/', buildsAlastor, name="buildsAlastor"),
    path('build-silmeria/', buildsSilmeria, name="buildsSilmeria"),
    path('build-reaper/', buildsReaper, name="buildsReaper"),
    path('build-belldandy/', buildsBelldandy, name="buildsBelldandy"),
    path('build-tanque/', buildsTanque, name="buildsTanque"),



    # Galeria

    path('details-post-gallery.html/', postgallery, name="postgallery"),
    path('gallery-anor.html/', GalleryAnor, name="GalleryAnor"),
    path('gallery-ariandel.html/', GalleryAriandel, name="GalleryAriandel"),
    path('gallery-amana.html/', GalleryAmana, name="GalleryAmana"),
    path('gallery-leyndell.html/', GalleryLeyndell, name="GalleryLeyndell"),
    path('gallery-nokron.html/', GalleryNokron, name="GalleryNokron"),
]