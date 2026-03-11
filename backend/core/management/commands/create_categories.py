# core/management/commands/create_categories.py

from django.core.management.base import BaseCommand
from core.models import Category


class Command(BaseCommand):
    help = 'Create initial business categories'

    def handle(self, *args, **options):
        categories = [
            {'name': 'Retail', 'description': 'Shops and stores selling products directly to consumers', 'icon': 'store'},
            {'name': 'Food & Beverage', 'description': 'Restaurants, cafes, food stalls, and catering', 'icon': 'restaurant'},
            {'name': 'Technology', 'description': 'Software, apps, IT services, and tech products', 'icon': 'computer'},
            {'name': 'Agriculture', 'description': 'Farming, agribusiness, and agricultural products', 'icon': 'leaf'},
            {'name': 'Services', 'description': 'Professional and personal services', 'icon': 'briefcase'},
            {'name': 'Manufacturing', 'description': 'Production and manufacturing of goods', 'icon': 'factory'},
            {'name': 'Education', 'description': 'Tutoring, coaching, and educational services', 'icon': 'school'},
            {'name': 'Healthcare', 'description': 'Medical services, pharmacy, and wellness', 'icon': 'medical'},
            {'name': 'Fashion', 'description': 'Clothing, accessories, and fashion retail', 'icon': 'shirt'},
            {'name': 'E-commerce', 'description': 'Online selling and digital marketplace', 'icon': 'cart'},
        ]

        for cat_data in categories:
            category, created = Category.objects.update_or_create(
                name=cat_data['name'],
                defaults=cat_data
            )
            status = 'Created' if created else 'Updated'
            self.stdout.write(f"{status}: {category.name}")

        self.stdout.write(self.style.SUCCESS(f'Successfully created/updated {len(categories)} categories'))
