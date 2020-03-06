import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        input {
            background: rgba(0,0,0, 0.1);
            border: 0;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #FFF;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7)
            }
        }
        hr { 
            border: 0;
            height: 1px;
            background: rgba(255,255,255, 0.4);
            margin: 10px 0 20px;
        }
        span {
            color: #FB6F91;
            align-self: flex-start;
            margin: 0 0 10px;
            font-weight: bold;
        }

        button {
            margin: 5px 0 0;
            height: 44px;
            background: #113d15;
            font-weight: bold;
            color: #FFF;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.05, '#113d15')};
            }
        }

        a {
            color: #FFF;
            margin-top: 15px;
            font-size: 16px;
            opacity: 0.8;

            &:hover {
                opacity: 1;
            }
        }
    }
    /* Only direct child from div (not form)  */
    >    button {
            width: 100%;
            margin: 15px 0 0;
            height: 44px;
            background: #F94C75;
            font-weight: bold;
            color: #FFF;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.1, '#F94C75')};
            }
        }
`;