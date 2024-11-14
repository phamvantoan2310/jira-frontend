import { Button, Form } from "antd"

export const sendOTPAndRenewOTPButtonComponent = (setIsAlbeInputOTP, sendOTP) => {
    return (
        <div>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={() => (setIsAlbeInputOTP(true), sendOTP())}>
                    Xác nhận
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={() => (setIsAlbeInputOTP(true), sendOTP())}>
                    Xác nhận
                </Button>
            </Form.Item>
        </div>
    )
}