import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import  FeedContainerComponent  from './pages/feed-components/feed-container.component';
import  ForumContainerComponent  from './pages/forum-components/forum-container.component';
import { LoginComponent } from './pages/login.component/login.component';
import { NavbarComponent } from './navbar.component';
import { RichTextEditorComponent } from './pages/forum-components/rich-text-editor-component/draftjs';
import { AnswerRichTextEditorComponent } from './pages/forum-components/rich-text-editor-component/answer-draftjs';



export const MainComponent: React.FC = () => {
    return <div id="main-component">
        <BrowserRouter>
            <main>
                <Switch>
                    <Route exact path="/">
                        <LoginComponent />
                    </Route>
                    <Fragment>
                        <NavbarComponent />
                        <Route exact path="/feed">
                            <FeedContainerComponent />
                        </Route>
                        <Route exact path="/forum">
                            <ForumContainerComponent />
                        </Route>
<<<<<<< HEAD
                        <Route exact path="/question">
                            {/* <PostQuestionComponent /> */}
                        </Route>
                        <Route exact path="/answer">
                            {/* <PostAnswerComponent /> */}
                            {/* displaying the text editor here for testing purposes until the question or answer page can be rendered with it. */}
                            <RichTextEditorComponent />
=======
                        <Route exact path="/postquestion">
                            <RichTextEditorComponent />
                        </Route>
                        <Route exact path="/postanswer">
                            <AnswerRichTextEditorComponent />
>>>>>>> 8a9f153f775a4c47b9d2746562e32c492288a56b
                        </Route>
                    </Fragment>
                </Switch>
            </main>
        </BrowserRouter>
    </div>
}