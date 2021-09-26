import {
    Route,
    Switch,
    withRouter,
    RouteComponentProps
} from 'react-router-dom';

function Router() {
    return (
        <Switch>
            <Route path='/' />
            <Route path='group/:group_id' />
        </Switch>
    );
}

export default withRouter(Router);