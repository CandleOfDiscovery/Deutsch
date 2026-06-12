import json
import os

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

DEFAULT_MODEL = os.getenv('OPENAI_MODEL', 'gpt-5.2')
SYSTEM_PROMPT = '''You are DeutschMeister Tutor, a warm and precise German language coach.
Help learners practice German using CEFR-aware explanations. Keep answers concise, encouraging,
and practical. Include German examples with English explanations. Correct mistakes gently and
suggest one next exercise. Never claim to be a human teacher.'''


def _payload(request):
    if not request.body:
        return {}
    try:
        return json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return {}


def _fallback_reply(message, level, focus):
    topic = focus or 'conversation'
    prompt = message or 'Greet me and give me a quick German practice exercise.'
    return (
        f'Gern! I can help with {topic} at {level}. Prototype tutor mode is active because '
        'OPENAI_API_KEY is not configured. Try this now: write three German sentences about your day. '
        f'For your prompt (“{prompt[:120]}”), start with: “Heute habe ich …” and I will help correct it.'
    )


def _openai_reply(message, level, focus):
    from openai import OpenAI

    client = OpenAI()
    response = client.responses.create(
        model=DEFAULT_MODEL,
        input=[
            {'role': 'system', 'content': SYSTEM_PROMPT},
            {
                'role': 'user',
                'content': (
                    f'Learner level: {level}. Practice focus: {focus}. '
                    f'Learner message: {message}'
                ),
            },
        ],
    )
    return response.output_text


@csrf_exempt
def tutor_health(request, *args, **kwargs):
    return JsonResponse({
        'status': 'success',
        'message': 'DeutschMeister AI Tutor ready!',
        'model': DEFAULT_MODEL,
        'requires_api_key': not bool(os.getenv('OPENAI_API_KEY')),
    })


@csrf_exempt
def tutor_chat(request, *args, **kwargs):
    data = _payload(request)
    message = str(data.get('message') or '').strip()
    level = str(data.get('level') or 'A2').strip().upper()
    focus = str(data.get('focus') or 'speaking confidence').strip()

    if not message:
        message = 'Give me a friendly German practice prompt.'

    if os.getenv('OPENAI_API_KEY'):
        try:
            reply = _openai_reply(message, level, focus)
            source = 'openai'
        except Exception as exc:
            reply = _fallback_reply(message, level, focus)
            source = f'fallback: {exc.__class__.__name__}'
    else:
        reply = _fallback_reply(message, level, focus)
        source = 'fallback'

    return JsonResponse({
        'status': 'success',
        'message': 'DeutschMeister AI Tutor responded successfully.',
        'reply': reply,
        'level': level,
        'focus': focus,
        'model': DEFAULT_MODEL,
        'source': source,
    })
