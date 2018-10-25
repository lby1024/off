import styled from 'styled-components'
import logo from '../../static/logo.png'


export const DetailWrapper = styled.div`
    background-color: #f3f3f3;
    min-height: 100vh;
    .ant-card{
        margin: 60px 21px 21px 21px;
        .map{
            height: 450px;
            background-color: #f3f3f3;
        }
    }
`

export const HeaderWrapper = styled.div`
    height: 60px;
    background-color: #001529;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    .left{
        height: 60px;
        display: flex;
        align-items: center;
        .logo{
            display: inline-block;
            height: 60px;
            width: 100px;
            background-image: url(${logo});
            background-size: auto 70%;
            background-position: center;
            background-repeat: no-repeat;
        }
        span{
            font-size: 18px;
        }
    }
    .right{
        height: 60px;
        span{
            cursor: pointer;
            height: 60px;
            line-height: 60px;
            padding-right: 39px;
            font-size: 18px;
            &:nth-child(2){
                color: #d4237a;
            }
        }
    }
`

export const InfoWrapper = styled.div`
    padding: 60px 180px 0 180px;
    &::after{
        content: '';
        display: block;
        margin-top: 60px;
        border-bottom: 1px solid #bebebe;
    }
    &:last-child{
        &::after{
            border: 0;
        }
    }
    h3{
        font-size: 21px;
        color: #bebebe;
    }
    div{
        padding-left: 80px;
        line-height: 39px;
        font-size: 16px;
        span:nth-child(1){
            color: #bebebe;
            margin-right: 21px;
        }
    }
`