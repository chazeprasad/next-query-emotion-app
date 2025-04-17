"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import styled from "@emotion/styled";
import { useState } from "react";

// ----------------------------------------------------------------------
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  font-family: sans-serif;
`;


// ----------------------------------------------------------------------

export function Sample() {
  const queryClient = useQueryClient();
  

  return (
    <Container>
      <h4>Start here...</h4>
    </Container>
  );
}
