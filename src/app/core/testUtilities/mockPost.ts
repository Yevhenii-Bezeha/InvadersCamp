import { PostInf } from '@interfaces/postRelatedTypes';

export const mockPost: PostInf = {
  _id: '61deb2d103bf62c8bb461446',
  title: 'Zero trust makes business secure by default',
  description:
    "As enterprises turn to hybrid IT, they find that conventional identity and access management doesn't keep up.\nIn a rush to digitally transform, enterprises are embracing mobile, smart devices, machine learning, and new, more agile methods of application development, deployment, and management. Never have companies faced so much technological change.\n\nThe transformation isn't just about new mobile apps and intelligent new features, however. The changes run deep into the enterprise's core with emerging cloud platforms and microservice architectures working with more static legacy systems. \"This creates a lot of challenges when it comes to managing systems across the enterprise, especially when it comes to security and access management,\" says Scott Crawford, information security research head at 451 Research, a part of S&P Global Market Intelligence. How can organizations make certain that systems and people can only access the right systems and data?\n\nThere's no easy answer. With the increased interconnectivity and dynamic nature of computing across disparate cloud platforms, and cloud services, microservices, and software components, how enterprises decide whether they can trust users or systems to connect to any given resource at any given time has grown markedly complex. How can a user be trusted when attempting to perform an action? And with increased automation, how can a server, workload, or software component be trusted to connect between cloud systems and legacy on-premises systems?",
  tags: ['Psychology'],
  userId: '61deb2d103bf62c8bb461446',
  user: [
    {
      _id: '61deb0b603bf62c8bb4613c7',
      avatar: 'sentiment_very_satisfied',
      name: 'Blinchik',
      email: 'test@test.com',
    },
  ],
  likes: [
    {
      _id: '61deb2e403bf62c8bb46144e',
      isLiked: true,
      postId: '61deb2e003bf62c8bb46144a',
      userId: '61deb0b603bf62c8bb4613c7',
    },
  ],
  comments: [],
};
