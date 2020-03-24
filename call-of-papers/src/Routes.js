import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

const Home = React.lazy(() => import('pages/Home'))
const Event = React.lazy(() => import('pages/Events/Event'))
const EventsList = React.lazy(() => import('pages/Events/EventsList'))
const EventForm = React.lazy(() => import('pages/Events/EventForm'))
const Lecture = React.lazy(() => import('pages/Lectures/Lecture'))
const LecturesList = React.lazy(() => import('pages/Lectures/LecturesList'))
const LectureForm = React.lazy(() => import('pages/Lectures/LectureForm'))
const MyProfile = React.lazy(() => import('pages/MyProfile'))

const Routes = props => (
  <Suspense fallback="Loading..." >
    <Switch>
      <Route exact path="/" component={routerProps => <Home {...routerProps} />} />

      <Route exact path="/events" component={routerProps => <EventsList {...routerProps} />} />
      <Route path="/events/:eventId" component={routerProps => <Event {...routerProps} />} />
      <Route path="/events/form" component={routerProps => <EventForm {...routerProps} />} />

      <Route exact path="/lectures" component={routerProps => <LecturesList {...routerProps} />} />
      <Route path="/lectures/:lectureId" component={routerProps => <Lecture {...routerProps} />} />
      <Route path="/lectures/form" component={routerProps => <LectureForm {...routerProps} />} />

      <Route path="/profile/:profileId" component={routerProps => <MyProfile {...routerProps} />} />
    </Switch>
  </Suspense>
)

export default Routes
