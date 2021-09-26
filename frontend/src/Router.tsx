import {
    Route,
    Switch,
    withRouter,
    RouteComponentProps
} from 'react-router-dom';

import Home from './routes/Home'

function Router() {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='group/:group_id' />
        </Switch>
    );
}

export default withRouter(Router);