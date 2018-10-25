import styled from 'styled-components'

export const RootWrapper = styled.div`
    .ant-card{
        margin: 30px auto;
        .ant-btn{
            margin-left: 30px;
            margin-bottom: 21px;
        }
    }
    // 大屏
    @media (min-width: 750px) {
        .ant-card{width: 90%;}
    }
    // 小屏
    @media (max-width: 750px) {
        .ant-card{width: 100%;}
    }
`