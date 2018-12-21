import React, { PureComponent } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, AutoComplete, Table, Divider, Tag, Modal, Button } from 'antd';
import {connect} from "dva"

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


const residences = [{
  value: '营业',
  label: '营业',
}, {
  value: '停业',
  label: '停业',
}, {
  value: '审核',
  label: '审核',
}];

@connect((state)=>{
  return state.booklist
},(dispatch)=>{
  return {
    //获取初始数据
    getlist(url){
      dispatch({
        type:"booklist/getList",
        url
      })
    },
    //点击编辑更新数据
    updatalist(data){
      dispatch({
        type:"booklist/updataList",
        data
      })
    },
    //点击删除删除数据
    Deletelist(data){
      dispatch({
        type:"booklist/deleteList",
        data
      })
    }
  }
})
@Form.create()
export default class BookList extends PureComponent {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    visible_d: false,
    confirmLoading: false,
    confirmDirty: false,
    autoCompleteResult: []
  }
  componentDidMount(){
    this.props.getlist()
  }
  //点击删除的弹窗事件
  showModal_d = (str) => {
    window.localStorage.setItem("delete_key",str)
    this.setState({
      visible_d: true,
    });
  }

  handleOk_d = (e) => {
    this.setState({
      visible_d: false,
    });
    this.props.Deletelist()
    this.success()
  }

  handleCancel_d = (e) => {
    this.setState({
      visible_d: false,
    });
    this.warning()
  }
  //modal事件
  showModal = (e) => {
    window.localStorage.setItem("daload",JSON.stringify(e))
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.handleSubmit(e)
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
    this.warning()
  }
  //form事件
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(values.status[0]=="营业"){
          values.status=1
        }else if(values.status[0]=="停业"){
          values.status=2
        }else{
          values.status=3
        }
        this.props.updatalist(values)
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
          this.success()
          //清空input操作
          this.props.form.resetFields()
        }, 2000);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }
  //提示框事件
  success=()=> {
    Modal.success({
      title: 'Success',
      content: '操作成功',
    });
  }
  warning=()=> {
    Modal.warning({
      title: 'warning',
      content: '取消操作',
    });
  }
  render() {
    //解构本地存储
    const ls_obj=JSON.parse(window.localStorage.getItem("daload"))
    const {name,age,address,count,info,income,src,status}=ls_obj
    //table部分
    const { visible, confirmLoading, ModalText } = this.state;
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Src',
      key: 'src',
      dataIndex: 'src',
      render: (text, record) => (
        <img src={record.src} style={{ width: "40px", height: "40px" }} />
      ),
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Info',
      dataIndex: 'info',
      key: 'info',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <div>
          <span style={{ display: record.status == 1 ? 'block' : 'none' }}>营业</span>
          <span style={{ display: record.status == 2 ? 'block' : 'none' }}>停业</span>
          <span style={{ display: record.status == 3 ? 'block' : 'none' }}>审核</span>
        </div>
      ),
    }, {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={()=>{this.showModal(record)}}>编辑</Button>
          <Divider type="vertical" />
          <Button onClick={()=>{this.showModal_d(record.key)}}>删除</Button>
        </span>
      ),
    }];
    //form部分
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ))
    return (<div>
      <Table columns={columns} dataSource={this.props.list} pagination={{ pageSize: 3 }}/>
      <div>
        <Modal
          title="编辑信息"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="name"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: 'Please input your name',
                }],
              })(
                <Input type="text" placeholder={name}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="src"
            >
              {getFieldDecorator('src', {
                rules: [{
                  required: true, message: 'Please input your src!',
                },],
              })(
                <Input type="text" placeholder={src}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="age"
            >
              {getFieldDecorator('age', {
                rules: [{
                  required: true, message: 'Please input your age!',
                }],
              })(
                <Input type="text" placeholder={age}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="info"
            >
              {getFieldDecorator('info', {
                rules: [{
                  required: true, message: 'Please input your info!',
                }],
              })(
                <Input type="text" placeholder={info}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="address"
            >
              {getFieldDecorator('address', {
                rules: [{
                  required: true, message: 'Please input your address!',
                }],
              })(
                <Input type="text" placeholder={address}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="count"
            >
              {getFieldDecorator('count', {
                rules: [{
                  required: true, message: 'Please input your count!',
                }],
              })(
                <Input type="text" placeholder={count}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="status"
            >
              {getFieldDecorator('status', {
                initialValue: ['营业', '停业', '审核'],
                rules: [{ type: 'array', required: true, message: 'Please select your status!' }],
              })(
                <Cascader options={residences} />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
      <div>
        <Modal
          title="警告"
          visible={this.state.visible_d}
          onOk={this.handleOk_d}
          onCancel={this.handleCancel_d}
        >
          <p>确定要删除此项吗？</p>
        </Modal>
      </div>
    </div>)
  }
}