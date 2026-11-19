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
    title: 'AI Evals Study Guide',
    subtitle: 'Based on the course by Hamel Husain and Shreya Shankar',
    sections: [
      section('start', 'Start here', 'An independent guide to the July 2025 syllabus.', [
        group('Before the first lesson',
          resource('faq', 'AI Evals: Everything You Need to Know', 'https://hamel.dev/blog/posts/evals-faq/index.html',
            'Hamel and Shreya answer common questions about evaluating LLM products.'),
          resource('recipe-bot', 'Recipe Bot — Code and data', repo,
            'The July cohort project with sample data and notebooks.'),
          resource('official-course', 'Original course on Maven', 'https://maven.com/parlance-labs/evals',
            'Enroll on Maven to access the full course.'),
        ),
      ]),
      section('week-1', 'Week 1', 'Foundations and systematic error analysis', [
        group('1. Evaluating LLM applications',
          resource('needs-evals', 'Your AI Product Needs Evals', 'https://hamel.dev/evals/',
            'Hamel walks through evals for a real estate assistant.'),
          video('instrumentation', 'Instrumenting & Evaluating LLMs', 'SnbGD677_u0',
            'A public talk by Hamel and Shreya on tracing, evaluators, and human review.'),
        ),
        group('2. Systematic error analysis',
          video('error-analysis', 'Intro to Error Analysis', 'qH1dZ8JLLdU',
            'A walkthrough of conversation analysis and an annotation interface.', [
              resource('error-analysis-slides', 'Slides for this talk',
                'https://docs.google.com/presentation/d/1ZNThtixnbZGPpRcjMs8aGeQbzs-Ixe0mbTfvoaPqn3c/edit'),
            ]),
          video('open-axial-coding', 'Open & Axial Coding', 'AKg27L4E0M8',
            'Isaac Flath and Hamel turn notes on conversations into failure categories.'),
        ),
      ]),
      section('week-2', 'Week 2', 'Collaborative annotation and automated evaluation', [
        group('3. Collaborative evaluation',
          resource('who-validates', 'Who Validates the Validators?', 'https://arxiv.org/abs/2404.12272',
            'Shreya’s research on aligning automated evaluators with human judgment.'),
          resource('team-evals', 'Evals Your Whole Team Can Run', 'https://maven.com/p/447b3e',
            'Lucas Machado Rocha explains how his team runs evals.'),
        ),
        group('4. Automated evaluators',
          resource('judge-guide', 'Using LLM-as-a-Judge For Evaluation', 'https://hamel.dev/blog/posts/llm-judge/',
            'Hamel’s guide to building and validating an LLM judge.'),
          resource('auto-evals', 'Do Automated Evals Work?', 'https://parlance-labs.com/blog/posts/auto-evals.html',
            'A comparison of automated scores and human labels.'),
        ),
        group('Practice',
          homework(1, 'Recipe Bot', 'Assignment and starter files in the repository.'),
          homework(2, 'Error analysis', 'Sample conversations, a viewer, and a walkthrough notebook.'),
          video('hw12-video', 'HW 1 and 2 walkthrough with Isaac Flath', 'h9oAAAYnGx4',
            'The recording linked from the assignment README.'),
        ),
      ]),
      section('week-3', 'Week 3', 'Judge validation and RAG evaluation', [
        group('5. Validating LLM judges',
          resource('judgy', 'judgy', 'https://github.com/ai-evals-course/judgy',
            'The instructors’ library for evaluating judges and estimating uncertainty.'),
        ),
        group('6. RAG and complex architectures',
          resource('rag', 'Stop Saying RAG Is Dead', 'https://hamel.dev/notes/llm/rag/not_dead.html',
            'Hamel’s notes on retrieval and evaluating systems that use external documents.'),
        ),
        group('Guest sessions',
          video('fasthtml', 'Building an annotation interface with FastHTML', 'eda3dVwMlAo',
            'A demo from Isaac Flath’s workshop.', [
              resource('fasthtml-slides', 'Workshop slides',
                'https://ai-evals-course.github.io/isaac-ai-coding-fasthtml-annotation-workshop/'),
            ]),
          resource('vertical-evals', 'AI Evals in Vertical Industries', 'https://chrislovejoy.me/ai-evals-in-vertical-industries',
            'Slides from Chris Lovejoy’s August 7, 2025 guest lecture.'),
        ),
        group('Practice',
          homework(3, 'Judge validation', 'Traces, human labels, and a solution notebook.'),
          video('hw3-video', 'HW 3 walkthrough with Isaac Flath', '1d5aNfslwHg',
            'The recording linked from the assignment README.'),
        ),
      ]),
      section('week-4', 'Week 4', 'Human review and cost', [
        group('7. Interfaces for human review',
          resource('review-tool', 'Lesson 7 annotation tool', repo + '/lesson-7/labeling-tool',
            'Source code for reviewing and labeling conversations.'),
          resource('human-review-notes', 'Notes on human review interfaces',
            'https://vishalbakshi.com/blog/posts/2025-08-12-ai-evals/index.html',
            'Notes by a July cohort participant.'),
        ),
        group('8. Cost optimization',
          resource('field-guide', 'A Field Guide to Rapidly Improving AI Products', 'https://hamel.dev/blog/posts/field-guide/',
            'A field guide to experimenting with and improving production AI systems.'),
          resource('cost-session', 'Stop Paying Full Price for LLM Classification', 'https://maven.com/p/35471f',
            'Shreya’s public talk on reducing classification costs.'),
        ),
        group('Guest sessions',
          video('torres', 'From Noob to Automated Evals — Teresa Torres', 'N-qAOv_PNPc',
            'A PM’s account of building evals for Interview Coach.', [
              resource('torres-article', 'Interview Coach case study', 'https://www.producttalk.org/interview-coach-evals/'),
            ]),
        ),
        group('Practice',
          homework(4, 'Retrieval evaluation', 'Recipe Bot data and retrieval comparisons.'),
          video('hw4-video', 'HW 4 walkthrough', 'GMShL5iC8aY',
            'The recording linked from the assignment README.'),
        ),
      ]),
      section('after', 'After the course', 'Additional practice', [
        group('Practice',
          homework(5, 'Conversations and traces', 'Analyze Recipe Bot’s multi-step behavior.'),
          video('hw5-video', 'HW 5 walkthrough', 'z1oISsDUKLA',
            'The recording linked from the assignment README.'),
        ),
      ]),
    ],
  };
})();
