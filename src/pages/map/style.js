import styled from 'styled-components'

export const MapWrapper = styled.div`
    .ant-card{
        margin: 30px auto;
        .ant-btn{
            margin-right: 30px;
        }
    }
    .map{
        margin: 30px auto;
        background-color: #fff;
        box-sizing: border-box;
        padding: 24px 32px;
        .map02{
            height: 500px;
            background-color: #f3f3f3;
        }
    }
    // 大屏
    @media (min-width: 750px) {
        .ant-card{width: 90%;}
        .map{width: 90%}
    }
    // 小屏
    @media (max-width: 750px) {
        .ant-card{width: 100%;}
        .map{width: 100%;}
    }
`