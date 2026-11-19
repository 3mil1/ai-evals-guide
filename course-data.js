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

  const cohortRecordings = {
    "week-1": [
      {
        "id": "cohort-video-01",
        "title": "1. Fundamentals & Lifecycle of LLM Application Evaluation",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1w49aqXVh9FrIjf71N8q0rQSVvrBWKDAd/view",
        "duration": "56:40",
        "description": "Why evals matter and how they change from prototype to production."
      },
      {
        "id": "cohort-video-02",
        "title": "2. Systematic Error Analysis",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1Rns5cDOYzc1Au94aWYtqoe-up4YOqZ5n/view",
        "duration": "1:01:39",
        "description": "Review traces and identify recurring failures worth measuring."
      },
      {
        "id": "cohort-video-03",
        "title": "Braintrust Tutorial — Wayde Gilliam",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1QTd-OiX0M7d4Aaea9cw_Q6D2XNOLz-fs/view",
        "duration": "43:02",
        "description": "Guest session"
      },
      {
        "id": "cohort-video-04",
        "title": "Office Hours",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1fOnz6U124L3r6RbOWd1UpZF5TEoeDzLv/view",
        "duration": "1:40:14",
        "description": "Office hours"
      }
    ],
    "week-2": [
      {
        "id": "cohort-video-05",
        "title": "3. More Error Analysis & Collaborative Evaluation",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1qXZiVZweWYZVqpDdlgdwaBe357wWET2y/view",
        "duration": "59:34",
        "description": "Agree on quality criteria and apply them to real examples."
      },
      {
        "id": "cohort-video-06",
        "title": "4. Automated Evaluators",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1wSxmdiMt3UZI4caaOuG3mDyfgMrlt6Fi/view",
        "duration": "1:00:34",
        "description": "When to use deterministic checks and when to use an LLM judge."
      },
      {
        "id": "cohort-video-07",
        "title": "Taming Diffusion QR Codes with Evals and Inference-Time Scaling — Charles Frye",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1LO99uC_RwEIlurOJ2uxhTDtVPo5RJ_Jp/view",
        "duration": "44:43",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-08",
        "title": "10× Your RAG Evaluation by Avoiding These Pitfalls — Skylar Payne",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1MAO7XgImHP6pfeFuHc6kx2YXY1lqhzlD/view",
        "duration": "28:25",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-09",
        "title": "Office Hours · Session 1",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1fq6GhLsdpMcXICRUEwOop51YU8iqabSK/view",
        "duration": "1:18:26",
        "description": "Office hours"
      },
      {
        "id": "cohort-video-10",
        "title": "Office Hours · Session 2",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1cEiTzXnnmS2Z-ugcYWTY3H5hMyJjazdy/view",
        "duration": "47:11",
        "description": "Office hours"
      },
      {
        "id": "cohort-workshop-12-1-part-1",
        "title": "Braintrust: walkthrough for HW 1 and 2, part 1",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1nes0Awfwqbhh6IGUF6t7544uKPTIH--f/view",
        "duration": "10:50",
        "description": "Practice · HW 1 and 2"
      },
      {
        "id": "cohort-workshop-12-1-part-2",
        "title": "Braintrust: walkthrough for HW 1 and 2, part 2",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1Stl3VQVT9MicQIWHsgZuV_aFaYzQAgsf/view",
        "duration": "5:13",
        "description": "Practice · HW 1 and 2"
      },
      {
        "id": "cohort-workshop-12-2",
        "title": "Phoenix: walkthrough for HW 1 and 2",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1j-tXwyWCS8em6PbFCoTt5MFJ7tuQChye/view",
        "duration": "15:04",
        "description": "Practice · HW 1 and 2"
      },
      {
        "id": "cohort-workshop-12-3",
        "title": "LangSmith: walkthrough for HW 1 and 2",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1KKizb8WAa9mcdYiIKb7i1jp7hYgxSCsG/view",
        "duration": "22:41",
        "description": "Practice · HW 1 and 2"
      }
    ],
    "week-3": [
      {
        "id": "cohort-video-11",
        "title": "5. More Automated Evaluators",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1R3IKdNs9GwirrRR1jKFutPLwotqx6OU_/view",
        "duration": "55:55",
        "description": "Validate an LLM judge against human labels and interpret the results."
      },
      {
        "id": "cohort-video-12",
        "title": "6. RAG & Complex Architectures",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1tVZUqZ0sz2P1Im26pNKl5V_5JG5M_MJX/view",
        "duration": "59:46",
        "description": "Evaluate retrieval, generation, and multi-step pipelines separately."
      },
      {
        "id": "cohort-video-13",
        "title": "Scaling Inference-Time Compute for Better LLM Judges — Leonard Tang",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/12CES5zYBibyvOSIhDAsbo0408dj3d2aV/view",
        "duration": "31:08",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-14",
        "title": "Building Custom Eval Tools with Coding Agents — Isaac Flath",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1pEObi9refcOl0NgVImlRV-M3Pa6TAlcq/view",
        "duration": "46:39",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-15",
        "title": "From Vibe Checks to Evals to Feedback Loops — David Karam",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/14cocxgc3_f8Zd5pgXjKrZuHUPGOoBzc7/view",
        "duration": "30:02",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-16",
        "title": "A Playbook for Building AI Agents You Can Trust — Udi Menkes",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1HTZowPCsm4xUCAphJm9XedF8dTOCIZ70/view",
        "duration": "38:25",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-17",
        "title": "AI Evals in Vertical Industries — Chris Lovejoy",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/10hJwkgAViN66LO7cQKhlW1A33jo5kg1_/view",
        "duration": "34:15",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-18",
        "title": "Arize Phoenix Tutorial — Mikyo King",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1hN84S2Un4Nu3eQlwJ09SYlE3sqviP3lh/view",
        "duration": "49:02",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-19",
        "title": "Office Hours · Session 1",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1Y0Y3cu8FMzN6kN3ntJlz8baJcdEJwKJG/view",
        "duration": "22:32",
        "description": "Office hours"
      },
      {
        "id": "cohort-video-20",
        "title": "Office Hours · Session 2",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/12FA8P_5s-xtmDuxd8zkXpig_b--Ft-zg/view",
        "duration": "24:20",
        "description": "Office hours"
      },
      {
        "id": "cohort-video-21",
        "title": "Office Hours · Session 3",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1O-DPHojPfx-Vwbm6aCHaXQKyhkpG1pSZ/view",
        "duration": "55:49",
        "description": "Office hours"
      },
      {
        "id": "cohort-workshop-3-1",
        "title": "Braintrust: walkthrough for HW 3",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1f6PvQTh_I-vpGXC-UJL6L8VRnkBj9F6U/view",
        "duration": "21:41",
        "description": "Practice · HW 3"
      },
      {
        "id": "cohort-workshop-3-2",
        "title": "Phoenix: walkthrough for HW 3",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1Vn37cAAEF0_2ZBS1QUVoZghq1KJOoR0l/view",
        "duration": "16:39",
        "description": "Practice · HW 3"
      }
    ],
    "week-4": [
      {
        "id": "cohort-video-22",
        "title": "7. Efficient Continuous Human Review Systems",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1kODb70AGXS-TAVQOQNHsm_FZVuGV62rP/view",
        "duration": "59:02",
        "description": "Set up ongoing human review and decide which cases to annotate."
      },
      {
        "id": "cohort-video-23",
        "title": "8. Cost Optimization",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1UpOMaHAuT--YI42E33HJ3Uv3W1R3CT5k/view",
        "duration": "1:03:11",
        "description": "Trade-offs between quality, cost, and latency."
      },
      {
        "id": "cohort-video-24",
        "title": "Techniques for Evaluating Agents — SallyAnn DeLucia",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1Og7rAfHUW6rNIbHu8lwlz8fieDWKGo8o/view",
        "duration": "33:37",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-25",
        "title": "LangSmith Tutorial — Harrison Chase",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1kJhP91DGNj9ZhmxTYOMob-FSOAfXtKz_/view",
        "duration": "48:24",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-26",
        "title": "From Noob to 5 Automated Evals in 4 Weeks (as a PM) — Teresa Torres",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1KytaTYcTlERU21jrc_vosXrq-3IcbQyt/view",
        "duration": "1:10:21",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-27",
        "title": "SolveIt: The Thinking Developer’s Environment — Jeremy Howard & Johno Whitaker",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1No_cZMSKxmSZ1dzLyvzM1HrNA9MyQGVg/view",
        "duration": "1:42:26",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-28",
        "title": "Testing Real AI Products Live — Robert Ta",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1LWq_KadE4V49g7mnXt7luc2SAaFGcgwt/view",
        "duration": "1:00:49",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-29",
        "title": "Fireside Chat with DSP Creator — Omar Khattab",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1FXmm3pD9bnoMw4IpPBdeESMy_gpSn5P3/view",
        "duration": "44:59",
        "description": "Guest sessions"
      },
      {
        "id": "cohort-video-30",
        "title": "Office Hours · Session 1",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1ylxOxqmkSOMGXbWo8w8_bBSfZuqFGyJe/view",
        "duration": "1:06:30",
        "description": "Office hours"
      },
      {
        "id": "cohort-video-31",
        "title": "Office Hours · Bonus session",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1E4Jyenv1XOY-u0XsyBlwVqL2f-33MvSC/view",
        "duration": "1:05:26",
        "description": "Office hours"
      },
      {
        "id": "cohort-workshop-4-1",
        "title": "Braintrust: walkthrough for HW 4",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1Q_R12TTBO4ToyIuS_EcIFJ0pMoLO8p1I/view",
        "duration": "23:11",
        "description": "Practice · HW 4"
      },
      {
        "id": "cohort-workshop-4-2",
        "title": "Phoenix: walkthrough for HW 4",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1SIH_i8JfCy7U2w9uMSkEUK1_o4MH1eDk/view",
        "duration": "16:38",
        "description": "Practice · HW 4"
      }
    ],
    "after": [
      {
        "id": "cohort-workshop-5-1",
        "title": "Braintrust: walkthrough for HW 5",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1T6YNnUMPgiuLRVw6d6uO0OeOPj3-L4A6/view",
        "duration": "22:03",
        "description": "Practice · HW 5"
      },
      {
        "id": "cohort-workshop-5-2",
        "title": "Phoenix: walkthrough for HW 5",
        "kind": "video",
        "access": "invitation",
        "url": "https://drive.google.com/file/d/1C6czwUj_0LVIvYGKsducVYzEHl74DgEg/view",
        "duration": "14:57",
        "description": "Practice · HW 5"
      }
    ]
  };

  window.COURSE.sections[0].groups[0].items.push(resource(
    'cohort-drive-folder', 'July 2025 recordings on Google Drive',
    'https://drive.google.com/drive/folders/1nvbYZsmEPTxp7ZUwPubJqAUNLztH-Cwd',
    'Sign in to Google Drive with the account that received an invitation.',
  ));
  for (const chapter of window.COURSE.sections) {
    const items = cohortRecordings[chapter.id];
    if (!items) continue;
    chapter.groups.push({
      title: 'Cohort recordings · Invitation required',
      collapsible: true,
      items,
    });
  }
})();
