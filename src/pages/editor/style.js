import styled from 'styled-components'

export const EditorWrapper = styled.div`
    .ant-card{
        margin: 30px auto;
        min-height: 300px;
        .ant-btn{
            margin-left: 30px;
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