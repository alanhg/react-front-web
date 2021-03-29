import { IRootState } from 'src/app/types/IRootState';
import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import BottomBar from "app/components/main/bottom-bar";
import Header from "app/components/main/header";
import { initAppAction } from "app/actions/user-actions";


interface IProps extends DispatchProps, StateProps, RouteComponentProps, WrappedComponentProps {
}

interface IState {

}

export class Main extends React.Component<IProps, IState> {

  componentDidMount() {
    this.props.initAppAction();
  }

  render() {
    return (
      <div>
        <Header/>
        <h1>hello world</h1>
        <BottomBar/>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  user: state.user
});

const mapDispatchToProps = {
  initAppAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(Main)));
