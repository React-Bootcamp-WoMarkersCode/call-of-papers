import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

const About = React.lazy(() => import('pages/About'))
const DownloadLectures = React.lazy(() => import('pages/Lectures/LecturesCSV'))
const Event = React.lazy(() => import('pages/Events/Event'))
const EventsList = React.lazy(() => import('pages/Events/EventsList'))
const EventForm = React.lazy(() => import('pages/Events/EventForm'))
const Home = React.lazy(() => import('pages/Home/Home'))
const Lecture = React.lazy(() => import('pages/Lectures/Lecture'))
const LecturesList = React.lazy(() => import('pages/Lectures/LecturesList'))
const LectureForm = React.lazy(() => import('pages/Lectures/LectureForm'))
const Login = React.lazy(() => import('pages/Login'))
const MyProfile = React.lazy(() => import('pages/Profile/MyProfile'))
const PartnersForm = React.lazy(() => import('pages/Events/PartnersForm'))
const ProfileForm = React.lazy(() => import('pages/Profile/ProfileForm'))
const SubmissionsList = React.lazy(() => import('pages/Submissions/submissionsList'))
const SubmissionDetails = React.lazy(() => import('pages/Submissions/submissionDetails'))

const Routes = props => (
  <Suspense fallback="Loading..." >
    <Switch>
      <Route exact path="/" component={routerProps => <Home {...routerProps} />} />

      <Route exact path="/login" component={routerProps => <Login {...routerProps} />} />

      <Route exact path="/about" component={routerProps => <About {...routerProps} />} />

      <Route exact path="/events" component={routerProps => <EventsList {...routerProps} />} />
      <Route exact path="/events/form" component={routerProps => <EventForm {...routerProps} />} />
      <Route exact path="/events/form/:eventId" component={routerProps => <EventForm {...routerProps} />} />
      <Route exact path="/events/:eventId" component={routerProps => <Event {...routerProps} />} />
      <Route path="/partners/:eventId" component={routerProps => <PartnersForm {...routerProps} />} />
      <Route exact path="/events/:eventId/submissions/" component={routerProps => <SubmissionsList {...routerProps} />} />
      <Route exact path="/events/:eventId/submissions/:submissionId" component={routerProps => <SubmissionDetails {...routerProps} />} />

      <Route exact path="/lectures" component={routerProps => <LecturesList {...routerProps} />} />
      <Route exact path="/download-lectures" component={routerProps => <DownloadLectures {...routerProps} />} />
      <Route exact path="/lectures/form/:eventId" component={routerProps => <LectureForm {...routerProps} />} />
      <Route path="/lectures/:lectureId" component={routerProps => <Lecture {...routerProps} />} />

      <Route path="/profile/" component={routerProps => <MyProfile {...routerProps} />} />
      <Route path="/profileForm" component={routerProps => <ProfileForm {...routerProps} />} />
    </Switch>
  </Suspense>
)

export default Routes
