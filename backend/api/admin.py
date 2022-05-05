from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from api.models import Post,Contact,User

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Contact)