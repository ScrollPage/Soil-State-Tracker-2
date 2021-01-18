from django.core.management.base import BaseCommand

from detector.models import Detector
from detector_data.models import DetectorData

class Command(BaseCommand):
    help = 'Creates a random DetectorData with the ability of possible date deviation'

    def add_arguments(self, parser):
        parser.add_argument('amount_data', type=int)
        parser.add_argument('extra_date', type=int)

    def handle(self, *args, **options):
        for detector in Detector.objects.all():
            for _ in range(options.get('amount_data', 0)):
                d = DetectorData.create_random(detector, options.get('extra_date'))