from django.contrib import admin
from django.urls import re_path,path,include               
from api.views import PostView, ContactView, RegisterView, LoginView, UserView, LogoutView, AuthorPostView                       

urlpatterns = [
    path('post', PostView.as_view()),
    re_path('post/(?P<slug>.+)/$', PostView.as_view()),
    re_path('author/post/(?P<user>.+)/$', AuthorPostView.as_view()),
    path('contact',ContactView.as_view()),
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    re_path('user/(?P<token>.+)/$', UserView.as_view()),
    path('logout', LogoutView.as_view()),
]