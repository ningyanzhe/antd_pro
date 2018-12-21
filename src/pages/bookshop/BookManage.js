import {
  Form, Modal, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {connect} from 'dva'
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
@Form.create()
@connect((state)=>{
  console.log(state.booklist)
  return state.booklist
},(dispatch)=>{
  return {
    ADDlist(data){
      dispatch({
        type:"booklist/addlist",
        data
      })
    }
  }
})
export default class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  success=()=> {
    Modal.success({
      title: 'success',
      content: '新增商店成功',
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.ADDlist(values)
        var that=this
        setTimeout(function(){
          that.success()
          that.props.form.resetFields()
        },1000)
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
  clear_form=()=>{
    this.props.form.resetFields()
  }
  render() {
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
    ));

    return (
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
                <Input type="text" />
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
                <Input type="text" />
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
                <Input type="text" />
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
                <Input type="text" />
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
                <Input type="text" />
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
                <Input type="text" />
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
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" onClick={()=>{this.clear_form()}}>重置表单</Button>
              <Button type="primary" htmlType="submit">确认添加</Button>
            </FormItem>
          </Form>
    );
  }
}
