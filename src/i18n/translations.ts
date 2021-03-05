export default {
  en: {
    common: {
      guidance_title: 'Guidance'
    },
    group: {
      Title: 'Filter by Group',
      KNOW: 'Know',
      EXPLORE: 'Explore',
      PLAN: 'Plan',
      INTEGRATE: 'Integrate'
    },
    file: {
      Download: 'Download'
    },
    areas: {
      limitations: {
        title: 'Limitations in data sources',
        questions: ['Are there limitations that could influence your project’s outcomes?'],
        guidance: `Consider:

* bias in data collection, inclusion/exclusion, analysis, algorithms
* gaps or omissions in data
* other issues affecting decisions, such as team composition
`
      },
      'ethical-legislative': {
        title: 'Ethical and legislative context',
        questions: ['What existing ethical codes apply to your sector or project?', 'What legislation, policies, or other regulation shape how you use data?', 'What requirements do they introduce?'],
        guidance: `Consider:
        
* the rule of law;
* human rights;
* data protection;
* IP and database rights;
* anti-discrimination laws;
* and data sharing, policies, regulation and ethics codes/frameworks specific to sectors (eg health, employment, taxation).`
      },
      mitigations: {
        title: 'Minimising negative effects',
        questions: ['What steps can you take to minimise harm?', 'How could you reduce any limitations in your data sources? How are you keeping personal and other sensitive information secure?', 'How are you measuring, reporting and acting on potential negative impacts of your project?', 'What benefits will these actions bring to your project?'],
        guidance: ''
      }, 
      reasons: {
        title: 'Your reasons for using data',
        questions: ['What is your primary motivation for collecting and using data in this project?', 'What are your main use cases? What is your business model?', 'Are you making things better for society? How and for whom?', 'Are you replacing another product or service as a result of this project? '],
        guidance: ''
      }, 
      'positive-effects': {
        title: 'Positive effects on people',
        questions: ['Which individuals, groups, demographics or organisations will be positively affected by this project? How?', 'How are you measuring and communicating positive impact? How could you increase it?'],
        guidance: ''
      },
      'negative-effects': {
        title: 'Negative effects on people',
        questions: ['Who could be negatively affected by this project?', 'Could the way that data is collected, used or shared cause harm or expose individuals to risk of being re-identified?', 'Could it be used to target,profile or prejudice people, or unfairly restrict access (eg exclusive arrangements)?', 'How are limitations and risks communicated to people?'],
        guidance: `Consider:
        
        * people whom the data is
        about;
        * people impacted by its use
        * organisations using the data`
      }
    }
  },
};
