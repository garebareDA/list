import {
    Route,
    Switch,
    withRouter,
    RouteComponentProps
} from 'react-router-dom';

import Home from './routes/Home'
import Group from './routes/Group'

function Router() {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/group/:groupID' component={Group}/>
        </Switch>
    );
}

export default withRouter(Router);