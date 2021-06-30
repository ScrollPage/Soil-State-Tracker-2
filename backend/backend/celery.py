import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

app = Celery("backend")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

app.conf.beat_schedule = {
    "release": {"task": "detector.tasks.release", "schedule": crontab(minute="*")},
    "duplicate_send": {
        "task": "detector.tasks.duplicate_send",
        "schedule": crontab(minute="*"),
    },
}
