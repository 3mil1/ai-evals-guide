(() => {
  const repo = 'https://github.com/ai-evals-course/recipe-chatbot/tree/e08dec083c32';

  function resource(id, title, url, description) {
    return { id, title, kind: 'link', url, description };
  }

  function video(id, title, youtubeId, description, children = []) {
    return {
      id, title, kind: 'video', youtubeId, description, children,
      url: 'https://www.youtube.com/watch?v=' + youtubeId,
    };
  }

  function homework(number, title, description) {
    return resource('hw-' + number, 'HW ' + number + ' · ' + title, repo + '/homeworks/hw' + number, description);
  }

  function section(id, title, subtitle, groups) {
    return { id, title, subtitle, groups };
  }

  function group(title, ...items) {
    return { title, items };
  }

  window.COURSE = {
    title: 'AI Evals. Открытые материалы',
    subtitle: 'По программе Hamel Husain и Shreya Shankar',
    sections: [
      section('start', 'Начало', 'Независимый путеводитель по темам июльского потока 2025 года.', [
        group('Перед первым уроком',
          resource('faq', 'AI Evals: Everything You Need to Know', 'https://hamel.dev/blog/posts/evals-faq/index.html',
            'Ответы Hamel и Shreya на вопросы об оценке LLM-продуктов.'),
          resource('recipe-bot', 'Recipe Bot — код и данные', repo,
            'Учебный проект из июльского потока с готовыми примерами и ноутбуками.'),
          resource('official-course', 'Оригинальный курс на Maven', 'https://maven.com/parlance-labs/evals',
            'Запись на курс и доступ к полным материалам через Maven.'),
        ),
      ]),
      section('week-1', 'Неделя 1', 'Основы и систематический анализ ошибок', [
        group('1. Оценка LLM-приложений',
          resource('needs-evals', 'Your AI Product Needs Evals', 'https://hamel.dev/evals/',
            'Hamel показывает, как выстроить проверки на примере ассистента для работы с недвижимостью.'),
          video('instrumentation', 'Instrumenting & Evaluating LLMs', 'SnbGD677_u0',
            'Открытая лекция Hamel и Shreya о трассировке, проверках и ручном ревью.'),
        ),
        group('2. Систематический анализ ошибок',
          video('error-analysis', 'Intro to Error Analysis', 'qH1dZ8JLLdU',
            'Демонстрация анализа диалогов и работы с интерфейсом разметки.', [
              resource('error-analysis-slides', 'Слайды к видео',
                'https://docs.google.com/presentation/d/1ZNThtixnbZGPpRcjMs8aGeQbzs-Ixe0mbTfvoaPqn3c/edit'),
            ]),
          video('open-axial-coding', 'Open & Axial Coding', 'AKg27L4E0M8',
            'Isaac Flath и Hamel разбирают, как перейти от заметок о диалогах к категориям ошибок.'),
        ),
      ]),
      section('week-2', 'Неделя 2', 'Совместная разметка и автоматическая оценка', [
        group('3. Совместная оценка',
          resource('who-validates', 'Who Validates the Validators?', 'https://arxiv.org/abs/2404.12272',
            'Исследование Shreya о согласовании автоматических проверок с человеческим решением.'),
          resource('team-evals', 'Evals Your Whole Team Can Run', 'https://maven.com/p/447b3e',
            'Открытая сессия Lucas Machado Rocha о том, как команда выстраивает проверку качества.'),
        ),
        group('4. Автоматические проверки',
          resource('judge-guide', 'Using LLM-as-a-Judge For Evaluation', 'https://hamel.dev/blog/posts/llm-judge/',
            'Руководство Hamel по написанию и проверке LLM-судьи.'),
          resource('auto-evals', 'Do Automated Evals Work?', 'https://parlance-labs.com/blog/posts/auto-evals.html',
            'Авторы сравнивают автоматические оценки с человеческой разметкой.'),
        ),
        group('Практика',
          homework(1, 'Recipe Bot', 'Задание и стартовые материалы в репозитории.'),
          homework(2, 'Анализ ошибок', 'Готовые диалоги, просмотрщик и ноутбук с разбором.'),
          video('hw12-video', 'Разбор HW 1 и 2 с Isaac Flath', 'h9oAAAYnGx4',
            'Запись, на которую ссылается README задания.'),
        ),
      ]),
      section('week-3', 'Неделя 3', 'Валидация судей и оценка RAG', [
        group('5. Валидация LLM-судей',
          resource('judgy', 'judgy', 'https://github.com/ai-evals-course/judgy',
            'Библиотека авторов для оценки судьи и расчёта неопределённости.'),
        ),
        group('6. RAG и сложные архитектуры',
          resource('rag', 'Stop Saying RAG Is Dead', 'https://hamel.dev/notes/llm/rag/not_dead.html',
            'Заметки Hamel о поиске и оценке систем, которые используют внешние документы.'),
        ),
        group('Материалы гостевых выступлений',
          video('fasthtml', 'Интерфейс разметки на FastHTML', 'eda3dVwMlAo',
            'Демо из воркшопа Isaac Flath.', [
              resource('fasthtml-slides', 'Слайды воркшопа',
                'https://ai-evals-course.github.io/isaac-ai-coding-fasthtml-annotation-workshop/'),
            ]),
          resource('vertical-evals', 'AI Evals in Vertical Industries', 'https://chrislovejoy.me/ai-evals-in-vertical-industries',
            'Слайды гостевой лекции Chris Lovejoy от 7 августа 2025 года.'),
        ),
        group('Практика',
          homework(3, 'Валидация судьи', 'Трассы, человеческая разметка и ноутбук с решением.'),
          video('hw3-video', 'Разбор HW 3 с Isaac Flath', '1d5aNfslwHg',
            'Запись, на которую ссылается README задания.'),
        ),
      ]),
      section('week-4', 'Неделя 4', 'Ручная проверка и стоимость', [
        group('7. Интерфейсы для ручной проверки',
          resource('review-tool', 'Инструмент разметки из урока 7', repo + '/lesson-7/labeling-tool',
            'Код интерфейса для просмотра диалогов и сбора оценок.'),
          resource('human-review-notes', 'Заметки об интерфейсах ручной проверки',
            'https://vishalbakshi.com/blog/posts/2025-08-12-ai-evals/index.html',
            'Конспект участника июльского потока.'),
        ),
        group('8. Оптимизация стоимости',
          resource('field-guide', 'A Field Guide to Rapidly Improving AI Products', 'https://hamel.dev/blog/posts/field-guide/',
            'Руководство по экспериментам и улучшению AI-систем в эксплуатации.'),
          resource('cost-session', 'Stop Paying Full Price for LLM Classification', 'https://maven.com/p/35471f',
            'Открытая лекция Shreya о снижении стоимости классификации.'),
        ),
        group('Материалы гостевых выступлений',
          video('torres', 'From Noob to Automated Evals — Teresa Torres', 'N-qAOv_PNPc',
            'Открытое выступление о том, как PM строила оценки для Interview Coach.', [
              resource('torres-article', 'Разбор Interview Coach', 'https://www.producttalk.org/interview-coach-evals/'),
            ]),
        ),
        group('Практика',
          homework(4, 'Оценка поиска', 'Данные Recipe Bot и сравнение результатов поиска.'),
          video('hw4-video', 'Разбор HW 4', 'GMShL5iC8aY',
            'Запись, на которую ссылается README задания.'),
        ),
      ]),
      section('after', 'После курса', 'Дополнительная практика', [
        group('Практика',
          homework(5, 'Диалоги и трассы', 'Анализ многошагового поведения Recipe Bot.'),
          video('hw5-video', 'Разбор HW 5', 'z1oISsDUKLA',
            'Запись, на которую ссылается README задания.'),
        ),
      ]),
    ],
  };
})();
