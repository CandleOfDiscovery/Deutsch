from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Seed prototype demo users for DeutschMeister.'

    def handle(self, *args, **options):
        User = get_user_model()
        users = [
            ('demo@deutschmeister.dev', 'Demo Learner', 'DemoPass123!'),
            ('anna@deutschmeister.dev', 'Anna Beispiel', 'DemoPass123!'),
        ]
        for email, name, password in users:
            user, created = User.objects.get_or_create(username=email, defaults={'email': email, 'first_name': name})
            user.email = email
            user.first_name = name
            user.set_password(password)
            user.save()
            self.stdout.write(self.style.SUCCESS(f"{'Created' if created else 'Updated'} {email}"))
