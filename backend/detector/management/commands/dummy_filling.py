from django.core.management.base import BaseCommand

from random import uniform

from detector.models import Detector, DetectorData

class Command(BaseCommand):
    help = 'Publishes a messages to the main chanell'

    def add_arguments(self, parser):
        parser.add_argument('amount_data', type=int)

    def handle(self, *args, **options):
        for detector in Detector.objects.all():
            for _ in range(options.get('amount_data', 0)):
                DetectorData.objects.create(
                    detector=detector,
                    first_temp=round(uniform(0, 20), 2),
                    second_temp=round(uniform(0, 20), 2),
                    third_temp=round(uniform(0, 20), 2),
                    humidity=round(uniform(0, 20), 2),
                    lightning=round(uniform(0, 20), 2),
                    pH=round(uniform(0, 20), 2),
                )