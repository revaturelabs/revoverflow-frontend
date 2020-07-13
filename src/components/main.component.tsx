import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { FeedContainerComponent } from './pages/feed-components/feed-container.component';
import { ForumContainerComponent } from './pages/forum-components/forum-container.component';
import { LoginComponent } from './pages/login.component/login.component';
<<<<<<< HEAD
import PostQuestionComponent from './pages/PostQuestionComponent';
import PostAnswerComponent from './pages/PostAnswerComponent';
=======
import { NavbarComponent } from './navbar.component';
>>>>>>> 4870851557ffe9ef4e3227ea43b785e0f0b53f3d


export const MainComponent: React.FC = () => {
    return <div id="main-component">
        <BrowserRouter>
            <main>
                <Switch>
                    <Route exact path="/">
                        <LoginComponent />
                    </Route>
                    <div>
                         <NavbarComponent />
                        {/* <SideMenuComponent></SideMenuComponent> */}
                        <Route exact path="/feed">
                            <FeedContainerComponent />
                        </Route>
                        <Route exact path="/forum">
                            <ForumContainerComponent />
                        </Route>
                        <Route exact path="/question">
                            { <PostQuestionComponent /> }
                        </Route>
                        <Route exact path="/answer">
                            { <PostAnswerComponent />}
                        </Route>
                    </div>
                </Switch>
            </main>
        </BrowserRouter>
    </div>
}