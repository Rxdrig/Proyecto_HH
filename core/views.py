from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password, check_password
from .models import *
from django.http import JsonResponse
from django.contrib import messages
import re 



# Este es el base 
def index (request):
    return render (request,'core/index.html')  

# Vistas de Home usuario registrado
def home (request):
    return render (request,'core/home.html')  


# Vistas menu / pages
def builds (request):
    return render (request,'core/builds.html') # categories-list (rutas farmeo?)

def categoriassouls (request):
    return render (request,'core/categories-souls.html') # categories-grid (builds?)

def categoriaselden (request):
    return render (request,'core/categories-elden.html')

def typography (request):
    return render (request,'core/typography.html') # pagina con tipografias (util)

def comunidad (request):
    listComentarios = Comentario.objects.all()


    datos = {
        'listaComentarios':listComentarios
    }

    return render (request,'core/comunidad.html', datos) # post default (comunidad)


def postgallery (request):
    return render (request, 'core/details-post-gallery.html') # post gallery (builds, armas, mapa)

def postreview (request):
    return render (request, 'core/details-post-review.html') #Post review (stats/builds/armas?)

def contacto (request):
    return render (request,'core/contact.html') # Contacto (Feedback)




def registrarUsuario(request):
    if request.method == 'POST':
        nombre = request.POST['textNombre']
        contraseña = request.POST['textPassword']
        contraseña2 = request.POST['textPassword2']
        correo_electronico = request.POST['textCorreo']
        nombre_usuario = request.POST['textUsuario']
        foto = request.FILES.get('textFoto')

        # Validar longitud mínima de la contraseña
        if len(contraseña) < 8:
            return JsonResponse({'success': False, 'error_message': 'La contraseña debe tener al menos 8 caracteres.'})

        # Validar que la contraseña tenga al menos una letra mayúscula y un carácter especial
        if not re.search(r'[A-Z]', contraseña):
            return JsonResponse({'success': False, 'error_message': 'La contraseña debe tener al menos una letra mayúscula.'})
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', contraseña):
            return JsonResponse({'success': False, 'error_message': 'La contraseña debe tener al menos un carácter especial.'})

        # Verificar si las contraseñas coinciden
        if contraseña != contraseña2:
            return JsonResponse({'success': False, 'error_message': 'Las contraseñas no coinciden.'})

        # Verificar si el correo ya está registrado
        if Usuario.objects.filter(correo_electronico=correo_electronico).exists():
            return JsonResponse({'success': False, 'error_message': 'El correo electrónico ya está registrado.'})

        # Verificar si el nombre de usuario ya está registrado
        if Usuario.objects.filter(nombre_usuario=nombre_usuario).exists():
            return JsonResponse({'success': False, 'error_message': 'El nombre de usuario ya está en uso.'})

        # Encriptar contraseña
        contraseña_encriptada = make_password(contraseña)

        # Crear el usuario
        try:
            Usuario.objects.create(
                nombre=nombre,
                contraseña=contraseña_encriptada,
                correo_electronico=correo_electronico,
                nombre_usuario=nombre_usuario,
                foto=foto
            )
            return JsonResponse({'success': True})

        except Exception as e:
            return JsonResponse({'success': False, 'error_message': f'Ocurrió un error: {str(e)}'})

    return JsonResponse({'success': False, 'error_message': 'Método no permitido.'})




def login(request): 
    if request.method == 'POST':
        correo = request.POST.get('correo')
        contraseña = request.POST.get('password')

        if not correo or not contraseña:
            return JsonResponse({'success': False, 'error_field': 'correo' if not correo else 'password', 'error_message': 'Correo o contraseña vacíos.'})

        try:
            user = Usuario.objects.filter(correo_electronico=correo).first()

            if not user:
                return JsonResponse({'success': False, 'error_field': 'correo', 'error_message': 'Correo no registrado.'})

            if len(contraseña) < 8:
                return JsonResponse({
                    'success': False, 
                    'error_field': 'password', 
                    'error_message': 'La contraseña debe tener al menos 8 caracteres.'
                })

            # Validar que la contraseña tenga al menos una letra mayúscula y un carácter especial
            if not re.search(r'[A-Z]', contraseña):
                return JsonResponse({'success': False, 'error_field':'password','error_message':'La contraseña debe tener al menos una letra mayúscula.'})
            if not re.search(r'[!@#$%^&*(),.?":{}|<>]', contraseña):
                return JsonResponse({'success': False, 'error_field': 'password','error_message': 'La contraseña debe tener al menos un carácter especial.'})


            if check_password(contraseña, user.contraseña):
                request.session['correo_electronico'] = user.correo_electronico
                request.session['nombre'] = user.nombre
                print(f"Nombre del usuario guardado en sesión: {user.nombre}")
                return JsonResponse({'success': True, 'redirect_url': '/'})  # URL de redirección

            return JsonResponse({'success': False, 'error_field': 'password', 'error_message': 'Contraseña incorrecta.'})

        except Exception as e:
            return JsonResponse({'success': False, 'error_message': f'Error inesperado: {str(e)}'})

    return JsonResponse({'success': False, 'error_message': 'Método no permitido.'})





def logout_view(request):
    try:
        del request.session['correo_electronico']  # Elimina la sesión del correo
        return redirect('index')  # Redirige a la página de inicio después del logout
    except KeyError:
        return redirect('index')



def enviar_feedback(request): 
    if request.method == 'POST':
        contenido = request.POST.get('contenido', '').strip()

        if not contenido:
            return JsonResponse({'success': False, 'error_message': 'El mensaje no puede estar vacío.'})

        if request.user.is_authenticated:
            try:
                # Aquí primero verificas si el usuario está autenticado
                correo_electronico = request.session.get('correo_electronico')

                if not correo_electronico:
                    return JsonResponse({'success': False, 'error_message': 'No se encontró el correo electrónico en la sesión.'})

                # Si el correo está en la sesión, buscar al usuario en la base de datos
                usuario = Usuario.objects.get(correo_electronico=correo_electronico)

                Feedback.objects.create(
                    contenidos=contenido,
                    autor=usuario
                )
                return JsonResponse({'success': True, 'message': '¡Gracias por tu feedback!'})
            except Usuario.DoesNotExist:
                return JsonResponse({'success': False, 'error_message': 'Usuario no encontrado en la base de datos.'})
            except Exception as e:
                return JsonResponse({'success': False, 'error_message': f'Error inesperado: {str(e)}'})
        else:
            # Si el usuario no está autenticado, devuelve el mensaje adecuado
            return JsonResponse({'success': False, 'error_message': 'Debes iniciar sesión para enviar feedback.'})

    return JsonResponse({'success': False, 'error_message': 'Método no permitido.'})




def comentar(request):
    if request.method == 'POST':
        contenido = request.POST.get('contenido', '').strip()
        
        if not contenido:
            return JsonResponse({'success': False, 'error_message': 'El comentario no puede estar vacío.'})
        
        if request.user.is_authenticated:
            try:
                # Verificar si el correo electrónico está en la sesión
                correo_electronico = request.session.get('correo_electronico')

                if not correo_electronico:
                    return JsonResponse({'success': False, 'error_message': 'No se encontró el correo electrónico en la sesión. Por favor, inicie sesión nuevamente.'})

                # Buscar al usuario por correo electrónico
                usuario = Usuario.objects.get(correo_electronico=correo_electronico)
                
                # Crear el comentario y guardarlo
                comentario = Comentario.objects.create(
                    contenidos=contenido,
                    autor=usuario
                )
                return JsonResponse({'success': True, 'message': 'Comentario guardado con éxito.'})
            except Usuario.DoesNotExist:
                return JsonResponse({'success': False, 'error_message': 'Usuario no encontrado en la base de datos.'})
            except Exception as e:
                return JsonResponse({'success': False, 'error_message': f'Error inesperado: {str(e)}'})
        else:
            return JsonResponse({'success': False, 'error_message': 'Debes iniciar sesión para comentar.'})
    
    return JsonResponse({'success': False, 'error_message': 'Método no permitido.'})





def deletecomentario (request, id):
    comentario = Comentario.objects.get(id=id)
    comentario.delete()
    return redirect(to="comunidad")






# vistas builds 

def buildsAlastor (request):
    return render (request,'core/builds/build-alastor.html')

def buildsSilmeria (request):
    return render (request,'core/builds/build-silmeria.html')

def buildsReaper (request):
    return render (request,'core/builds/build-reaper.html')

def buildsBelldandy (request):
    return render (request,'core/builds/build-belldandy.html')

def buildsTanque (request):
    return render (request,'core/builds/build-tanque.html')



# vistas galeria

def postgallery (request):
    return render (request, 'core/galeria/details-post-gallery.html') 

def GalleryAnor (request):
    return render (request, 'core/galeria/gallery-anor.html')

def GalleryAriandel (request):
    return render (request, 'core/galeria/gallery-ariandel.html')

def GalleryAmana (request):
    return render (request, 'core/galeria/gallery-amana.html')

def GalleryLeyndell (request):
    return render (request, 'core/galeria/gallery-leyndell.html')

def GalleryNokron (request):
    return render (request, 'core/galeria/gallery-nokron.html')




