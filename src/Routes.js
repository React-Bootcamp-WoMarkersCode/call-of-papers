import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Spin } from 'antd'

const About = React.lazy(() => import('pages/About'))
const CopyLecture = React.lazy(() => import('pages/Lectures/CopyLecture'))
const DownloadLectures = React.lazy(() => import('pages/Lectures/LecturesCSV'))
const Event = React.lazy(() => import('pages/Submissions'))
const EventsList = React.lazy(() => import('pages/Events/EventsList'))
const EventForm = React.lazy(() => import('pages/Events/EventForm'))
const Home = React.lazy(() => import('pages/Home/Home'))
const Lecture = React.lazy(() => import('pages/Lectures/Lecture'))
const LecturesList = React.lazy(() => import('pages/Lectures/LecturesList'))
const LectureForm = React.lazy(() => import('pages/Lectures/LectureForm'))
const Login = React.lazy(() => import('pages/Login'))
const MyProfile = React.lazy(() => import('pages/Profile/MyProfile'))
const PartnersForm = React.lazy(() => import('pages/Events/PartnersForm'))
const Privacidade = React.lazy(() => import('pages/Privacidade'))
const ProfileForm = React.lazy(() => import('pages/Profile/ProfileForm'))
const RoleComponent = React.lazy(() => import('pages/Login/RoleComponent'))
const SubmissionDetails = React.lazy(() => import('pages/Submissions/submissionDetails'))
const Termos = React.lazy(() => import('pages/Termos'))

const Routes = props => (
  <Suspense fallback={<Spin size="large" />} >
    <Switch>
      <Route exact path="/" component={routerProps => <Home {...routerProps} />} />

      <Route exact path="/login" component={routerProps => <Login {...routerProps} />} />
      <Route exact path="/login/:eventId" component={routerProps => <Login {...routerProps} />} />

      <Route exact path="/about" component={routerProps => <About {...routerProps} />} />
      <Route exact path="/termos-de-uso" component={routerProps => <Termos {...routerProps} />} />
      <Route exact path="/politica-de-privacidade" component={routerProps => <Privacidade {...routerProps} />} />

      <Route exact path="/events" component={routerProps => <EventsList {...routerProps} />} />
      <Route exact path="/events/form" component={routerProps => <EventForm {...routerProps} />} />
      <Route exact path="/events/form/:eventId" component={routerProps => <EventForm {...routerProps} />} />
      <Route exact path="/events/:eventId" component={routerProps => <Event {...routerProps} />} />
      <Route exact path="/events/:eventId/:submissionId" component={routerProps => <SubmissionDetails {...routerProps} />} />
      <Route path="/partners/:eventId" component={routerProps => <PartnersForm {...routerProps} />} />

      <Route exact path="/lectures" component={routerProps => <LecturesList {...routerProps} />} />
      <Route exact path="/download-lectures" component={routerProps => <DownloadLectures {...routerProps} />} />
      <Route exact path="/lectures/form" component={routerProps => <LectureForm {...routerProps} />} />
      <Route exact path="/lectures/form/:eventId" component={routerProps => <LectureForm {...routerProps} />} />
      <Route exact path="/lectures/form/edit/:lectureId" component={routerProps => <LectureForm {...routerProps} />} />
      <Route exact path="/lectures/copylecture/:eventId" component={routerProps => <CopyLecture {...routerProps} />} />
      <Route path="/lectures/:lectureId" component={routerProps => <Lecture {...routerProps} />} />

      <Route path="/profile/" component={routerProps => <MyProfile {...routerProps} />} />
      <Route path="/profileForm" component={routerProps => <ProfileForm {...routerProps} />} />
      <Route path="/welcome" component={routerProps => <RoleComponent {...routerProps} />} />
    </Switch>
  </Suspense>
)

export default Routes
