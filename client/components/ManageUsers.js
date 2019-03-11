import React, {Component} from 'react'
import regeneratorRuntime, { async } from "regenerator-runtime";
import {connect} from 'react-redux'
import {getAllUsers, deleteSingleUser, updateUserPermissions} from '../redux/thunks/admin'


class ManageUsers extends Component {
  async componentDidMount(){
    try{
      await this.props.getAllUsers()
    }catch(err){
      console.log(err)
    }
  }


  render(){
    return (
        <table className="ui celled table" style={{position: 'relative', top: '80px', left: '25%', width: '50%'}}>
          <thead>
            <tr><th>User Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Remove User</th>
          </tr></thead>
          <tbody>
        {this.props.users.map(el => {
          return (
            <tr key={el.id}>
              <td data-label="User Name">{el.userName}</td>
              <td data-label="Email">{el.email}</td>
              <td data-label="Admin">
                <div className="ui radio checkbox">
                  <input type="radio" onClick={() => this.props.updateUserPerm(el.id, !el.isAdmin)
} defaultChecked={el.isAdmin}/>
                  <label></label>
                </div>
               </td>
              <td data-label="Remove"><button className="negative ui button" id="delete-Btn" onClick={() => this.props.deleteUser(el.id)}>Delete</button></td> 
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state) => {
  
  return {
    users: state.admin.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    deleteUser: (id) => dispatch(deleteSingleUser(id)),
    updateUserPerm: (id, bool) => dispatch(updateUserPermissions(id, bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers)