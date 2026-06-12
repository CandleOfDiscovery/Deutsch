from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

FEATURE_NAME = 'Vocabulary'

@csrf_exempt
def stub_view(request, *args, **kwargs):
    return JsonResponse({'status': 'success', 'message': f'{FEATURE_NAME} coming soon!'})
