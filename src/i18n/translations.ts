export default {
  en: {
    common: {
      guidance_title: 'Guidance',
      notes_title: 'Notes',
      status_title: 'Status',
      new_button: 'New / Load Canvas',
      new_canvas_button: 'New Canvas',
      blank_button: 'Blank',
      upload_button: 'Upload / import',
      export_button: 'Export',
      print_button: 'Print',
      back_button: 'Back',
      filter_by_group_title: 'Filter by group',
      filter_by_status_title: 'Filter by status',
      YES: 'Yes',
      NO: 'No',
      UNSET: 'Unset',
      canvas_title: 'Canvas title',
      canvas_title_placeholder: 'Enter a name for your canvas',
      data_ethics_canvas: 'Data Ethics Canvas',
    },
    priority: {
      LOW: 'Low',
      MEDIUM: 'Medium',
      HIGH: 'High',
    },
    status: {
      IN_PROGRESS: 'In progress',
      FOR_REVIEW: 'For review',
      COMPLETE: 'Complete',
    },
    group: {
      KNOW: 'Know',
      EXPLORE: 'Explore',
      PLAN: 'Plan',
      INTEGRATE: 'Integrate'
    },
    file: {
      Download: 'Download'
    },
    info: {
      default: `
        <p>
          The <a href="https://theodi.org/article/data-ethics-canvas/" target="_blank">ODI Data Ethics Canvas</a>
          is a tool for anyone who collects, shares or uses data. It helps identify and manage ethical issues –
          at the start of a project that uses data, and throughout. It encourages you to ask important questions
          about projects that use data, and reflect on the responses. These might be:
        </p>
        <ul>
          <li>What is your primary purpose for using data in this project?</li>
          <li>Who could be negatively affected by this project?</li>
        </ul>
        <p>
          The Data Ethics Canvas provides a framework to develop ethical guidance that suits any context, whatever
          the project’s size or scope.
        </p>
      `,
      KNOW: `
        <p>Information about the KNOW section</p>
      `,
      EXPLORE: `
        <p>Information about the EXPLORE section</p>
      `,
      PLAN: `
        <p>Information about the PLAN section</p>
      `,
      INTEGRATE: `
        <p>Information about the INTEGRATE section</p>
      `,
    },
    areas: {
      limitations: {
        title: 'Limitations in data sources',
        questions: ['Are there limitations that could influence your project’s outcomes?'],
      },
      'ethical-legislative': {
        title: 'Ethical and legislative context',
        questions: ['What existing ethical codes apply to your sector or project?', 'What legislation, policies, or other regulation shape how you use data?', 'What requirements do they introduce?'],
      },
      mitigations: {
        title: 'Minimising negative effects',
        questions: ['What steps can you take to minimise harm?', 'How could you reduce any limitations in your data sources? How are you keeping personal and other sensitive information secure?', 'How are you measuring, reporting and acting on potential negative impacts of your project?', 'What benefits will these actions bring to your project?'],
      },
      reasons: {
        title: 'Your reasons for using data',
        questions: ['What is your primary motivation for collecting and using data in this project?', 'What are your main use cases? What is your business model?', 'Are you making things better for society? How and for whom?', 'Are you replacing another product or service as a result of this project? '],
      },
      'positive-effects': {
        title: 'Positive effects on people',
        questions: ['Which individuals, groups, demographics or organisations will be positively affected by this project? How?', 'How are you measuring and communicating positive impact? How could you increase it?'],
      },
      'negative-effects': {
        title: 'Negative effects on people',
        questions: ['Who could be negatively affected by this project?', 'Could the way that data is collected, used or shared cause harm or expose individuals to risk of being re-identified?', 'Could it be used to target,profile or prejudice people, or unfairly restrict access (eg exclusive arrangements)?', 'How are limitations and risks communicated to people?'],
      },
      'openness': {
        title: 'Openness and transparency',
        questions: ['How open can you be about this project? Could you publish your methodology, metadata, datasets, code or impact measurements?', 'Can you ask peers for feedback on the project? How will you communicate it internally?', 'Will you publish your actions and answers to this canvas openly?'],
      },
      'sharing': {
        title: 'Sharing data with others',
        questions: ['Are you going to be sharing data with other organisations? If so, who?', 'Are you planning to publish any of the data? Under what conditions?'],
      },
      'communicating': {
        title: 'Communicating your purpose',
        questions: ['Do people understand your purpose – especially people whom the data is about or who are impacted by its use?', 'How have you been communicating your purpose? Has this communication been clear?', 'How are you ensuring more vulnerable individuals or groups understand?'],
      },
      'engaging': {
        title: 'Engaging with people',
        questions: ['How can people engage with you about the project?', 'How can people correct information, appeal or request changes to the product/service? To what extent?', 'Are appeal mechanisms reasonable and well understood?'],
      },
      'implementation': {
        title: 'Ongoing implementation',
        questions: ['Are you routinely building in thoughts, ideas and considerations of people affected by your project? How?', 'What information or training might be needed to help people understand data issues?', 'Are systems, processes and resources available for responding to data issues that arise in the long-term?'],
      },
      'review': {
        title: 'Reviews and iterations',
        questions: ['How will ongoing data ethics issues be measured, monitored, discussed and actioned?', 'How often will your responses to this canvas be reviewed or updated? When?'],
      },
      'sources': {
        title: 'Data Sources',
        questions: ['Name/describe your project’s key data sources, whether you’re collecting data yourself or accessing via third parties.'],
      },
      'rights': {
        title: 'Rights around data',
        questions: [],
      },
      'actions': {
        title: 'Your actions',
        questions: ['What action will you take before moving forward with this project?', 'Who will be responsible for this action, and who must be involved?', 'Will you openly publish your actions and answers to this canvas?'],
      }
    }
  },
};
