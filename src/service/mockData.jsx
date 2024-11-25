const interviewsMockData = [
  {
    id: '1',
    title: 'Software Engineer',
    companyName: 'Tech Corp',
    address: '123 Main St, City, Country',
    time: '2024-11-15T12:00:00.000Z',
    duration: 60,
    description: 'Interview for the position of Software Engineer.',
    status: 'AwaitingFeedback'
  },
  {
    id: '2',
    title: 'Product Manager',
    companyName: 'Business Inc',
    address: '456 Elm St, City, Country',
    time: '2024-11-15T09:30:00.000Z',
    duration: 45,
    description: 'Interview for the position of Product Manager.',
    status: 'Scheduled'
  },
  {
    id: '3',
    title: 'Data Scientist',
    companyName: 'Data Solutions',
    address: '789 Oak St, City, Country',
    time: '2024-11-15T13:30:00.000Z',
    duration: 90,
    description: 'Interview for the position of Data Scientist.',
    status: 'Canceled'
  },
  {
    id: '4',
    title: 'UX Designer',
    companyName: 'Design Studio',
    address: '101 Pine St, City, Country',
    time: '2024-11-15T08:30:00.000Z',
    duration: 60,
    description: 'Interview for the position of UX Designer.',
    status: 'Completed'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    companyName: 'Infrastructure Ltd',
    address: '202 Maple St, City, Country',
    time: '2024-11-15T13:30:00.000Z',
    duration: 75,
    description: 'Interview for the position of DevOps Engineer.',
    status: 'AwaitingFeedback'
  }
];

const logbooksMockData = [
  {
    id: 1,
    userId: 1,
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    title: 'Job Search Logbook',
    logs: [
      {
        id: 1,
        logbookId: 1,
        title: 'Technical Interview with Tech Corp',
        content: 'Discussed algorithms and data structures.',
        interviewId: 1,
        interview: {
          id: 1,
          title: 'Software Engineer',
          companyName: 'Tech Corp',
          address: '123 Main St, City, Country',
          time: '2024-11-15T12:00:00.000Z',
          duration: 60,
          description: 'Interview for the position of Software Engineer.',
          status: 'AwaitingFeedback'
        },
        label: ['Technical', 'Coding']
      },
      {
        id: 2,
        logbookId: 1,
        title: 'Behavioral Interview with Business Inc',
        content: 'Discussed past experiences and team collaboration.',
        interviewId: 2,
        interview: {
          id: 2,
          title: 'Product Manager',
          companyName: 'Business Inc',
          address: '456 Elm St, City, Country',
          time: '2024-11-15T09:30:00.000Z',
          duration: 45,
          description: 'Interview for the position of Product Manager.',
          status: 'Scheduled'
        },
        label: ['Behavioral', 'Managerial']
      }
    ]
  },
  {
    id: 2,
    userId: 2,
    user: {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com'
    },
    title: 'Career Development Logbook',
    logs: [
      {
        id: 3,
        logbookId: 2,
        title: 'Design Interview with Design Studio',
        content: 'Discussed UI/UX design principles and portfolio.',
        interviewId: 4,
        interview: {
          id: 4,
          title: 'UX Designer',
          companyName: 'Design Studio',
          address: '101 Pine St, City, Country',
          time: '2024-11-15T08:30:00.000Z',
          duration: 60,
          description: 'Interview for the position of UX Designer.',
          status: 'Completed'
        },
        label: ['Design', 'Presentation']
      },
      {
        id: 4,
        logbookId: 2,
        title: 'Coding Interview with Infrastructure Ltd',
        content: 'Discussed DevOps practices and coding challenges.',
        interviewId: 5,
        interview: {
          id: 5,
          title: 'DevOps Engineer',
          companyName: 'Infrastructure Ltd',
          address: '202 Maple St, City, Country',
          time: '2024-11-15T13:30:00.000Z',
          duration: 75,
          description: 'Interview for the position of DevOps Engineer.',
          status: 'AwaitingFeedback'
        },
        label: ['Technical', 'Coding']
      }
    ]
  }
];

export { interviewsMockData, logbooksMockData };
