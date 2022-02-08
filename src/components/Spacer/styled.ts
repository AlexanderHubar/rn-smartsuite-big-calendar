import styled, { css } from 'styled-components/native';

import type { Space, SpacerProps } from './types';

const getSpace = (size?: Space) => (size || 0) + 'px';

export const Spacer = styled.View<SpacerProps>`
  margin: ${({ m, mt, mr, mb, ml }) =>
    `${getSpace(mt || m)} ${getSpace(mr || m)} ${getSpace(mb || m)} ${getSpace(
      ml || m
    )}`};
  ${({ mx }) =>
    mx
      ? css`
          margin-left: ${getSpace(mx)};
          margin-right: ${getSpace(mx)};
        `
      : ''}
  ${({ my }) =>
    my
      ? css`
          margin-top: ${getSpace(my)};
          margin-bottom: ${getSpace(my)};
        `
      : ''}

  padding: ${({ p, pt, pr, pb, pl }) =>
    `${getSpace(pt || p)} ${getSpace(pr || p)} ${getSpace(pb || p)} ${getSpace(
      pl || p
    )}`};
  ${({ px }) =>
    px
      ? css`
          padding-left: ${getSpace(px)};
          padding-right: ${getSpace(px)};
        `
      : ''}
  ${({ py }) =>
    py
      ? css`
          padding-top: ${getSpace(py)};
          padding-bottom: ${getSpace(py)};
        `
      : ''}
`;
