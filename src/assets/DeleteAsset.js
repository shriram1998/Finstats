import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../shared/History';
import Modal from '../shared/Modal';
import { deleteData } from './AssetAction';
const DeleteAsset = (props) => {
    let dataCpy = JSON.parse(JSON.stringify(props.assetOverview));
    delete dataCpy["instruments"][props.match.params.key];
    const actions = () => {
        return (<>
            <button className="ui button negative" onClick={()=>props.deleteData(props.userId,dataCpy)}>Delete</button>
            <Link to="/assets" className="ui button">Cancel</Link>
        </>);
    }
    return (
        <Modal
            title="Delete asset"
            content="Are you sure you want to delete?"
            actions={actions()}
            onDismiss={() => history.push('/assets')}
        />
    )
}

const mapStateToProps = (state) => {
    return {userId:state.auth.userId,assetOverview:state.assetOverview[state.auth.userId]}
}
export default connect(mapStateToProps,{deleteData})(DeleteAsset);