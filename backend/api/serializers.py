from rest_framework import serializers
from api.models import Post, Contact, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password','username','is_staff']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class PostSerializer(serializers.ModelSerializer):
    author_full_name = serializers.CharField()
    class Meta:
        model = Post
        fields = ('pid' ,'title', 'content','slug','time_upload','author','author_full_name','publish')

class ContactSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=100)
    email = serializers.CharField(max_length=200)
    subject = serializers.CharField(max_length=200)
    message = serializers.CharField()
    class Meta:
        model = Contact
        fields = ('name','email','subject','message')