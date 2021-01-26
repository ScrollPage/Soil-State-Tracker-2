"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""
import os
from pathlib import Path
from datetime import timedelta
import pusher
from . import local

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', '1237137613276712378')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(int(os.environ.get('DEBUG', 1)))

ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', '127.0.0.1 localhost').split(' ')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'cacheops',
    # 'channels',
    'corsheaders',
    'djoser',
    'drf_yasg',
    'rest_auth',
    'rest_framework',
    'rest_framework.authtoken',
    'silk',

    'chat',
    'client',
    'detector',
    'detector_data',
    'group',
    'payment',
]

MIDDLEWARE = [
    'silk.middleware.SilkyMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': os.environ.get('SQL_ENGINE', 'timescale.db.backends.postgresql'),
        'NAME': os.environ.get('SQL_DATABASE', 'postgres'),
        'USER': os.environ.get('SQL_USER', 'postgres'),
        'PASSWORD': os.environ.get('SQL_PASSWORD', 'pass'),
        'HOST': os.environ.get('SQL_HOST', '127.0.0.1'),
        'PORT': os.environ.get('SQL_PORT', '5432'),
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/staticfiles/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# REST FRAMEWORK
REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'backend.service.exception_handler',
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    # 'DEFAULT_PAGIINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    # 'PAGE_SIZE': 5
}

CORS_ORIGIN_WHITELIST = (
    u'http://127.0.0.1:3000',
    u'http://localhost:3000'
)

# smtp
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', local.EMAIL_HOST_PASSWORD)
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', local.EMAIL_HOST_USER)
EMAIL_PORT = 587

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

# User model
AUTH_USER_MODEL = 'client.Client'

#JWT Authentication
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,

    'AUTH_HEADER_TYPES': ('Token',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(days=1),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

#Domains
DJANGO_DOMAIN = 'http://127.0.0.1:8000'
REACT_DOMAIN = 'http://127.0.0.1:3000'

#Djoser
DJOSER = {
    'PASSWORD_RESET_CONFIRM_URL': '#/password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': '#/username/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': '#',
    'SEND_ACTIVATION_EMAIL': False,
    'SERIALIZERS': {
        'current_user': 'client.api.serializers.ClientMeSerialzier',
    },
}

# Pusher
pusher_client = pusher.Pusher(
    app_id=os.environ.get('PUSHER_APP_ID', local.PUSHER_APP_ID),
    key=os.environ.get('PUSHER_KEY', local.PUSHER_KEY),
    secret=os.environ.get('PUSHER_SECRET', local.PUSHER_SECRET),
    cluster=os.environ.get('PUSHER_CLUSTER', local.PUSHER_CLUSTER),
    ssl=True
)

# REDIS related settings
REDIS_HOST = os.environ.get('REDIS_HOST', local.REDIS_HOST)
REDIS_PORT = os.environ.get('REDIS_PORT', local.REDIS_PORT)

# Cacheops
CACHEOPS_REDIS = {
    'host': REDIS_HOST, # redis-server is on same machine
    'port': REDIS_PORT,        # default redis port
    'db': 2,             # SELECT non-default redis database
}

CACHEOPS_DEFAULTS = {
    'timeout': 60*30
}

CACHEOPS = {
    'detector.DetectorData': {'ops': 'all', 'timeout': 60*120},
    'detector.Detector': {'ops': {}, 'timeout': 60*120},
    'group.cluster': {'ops': 'all'},
    'chat.message': {'ops': 'all'},
    'chat.chat': {'ops': 'all'}
}

# Celery
CELERY_REDIS_DB = '1'
CELERY_BROKER_URL = f'redis://{REDIS_HOST}:{REDIS_PORT}/{CELERY_REDIS_DB}'
CELERY_BROKER_TRANSPORT_OPTIONS = {'visiblity_timeout': 3600}
CELERY_RESULT_BACKEND = f'redis://{REDIS_HOST}:{REDIS_PORT}/{CELERY_REDIS_DB}'
CELERY_ACCEPT_CONTENT = ['json', 'applicaion/json', 'applicaion/text']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERILIZER = 'json'