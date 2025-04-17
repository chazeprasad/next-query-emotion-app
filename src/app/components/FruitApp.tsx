"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import styled from "@emotion/styled";
import { useState } from "react";
import { Fruit } from "@/utils/db";

// ----------------------------------------------------------------------
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  font-family: sans-serif;
`;

const Form = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  input[type="text"] {
    flex: 1;
    padding: 0.5rem;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  button {
    padding: 0.5rem 1rem;
    background: #0070f3;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Card = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
  text-align: center;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }

  h3 {
    margin: 0.5rem 0;
  }
`;

const Status = styled.div<{ $active: boolean }>`
  color: ${(props) => (props.$active ? "green" : "gray")};
  font-weight: bold;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  button {
    padding: 0.25rem 0.5rem;
    background: #f44336;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

// ----------------------------------------------------------------------

export function FruitApp() {
  const queryClient = useQueryClient();
  const [newFruit, setNewFruit] = useState<Fruit>({
    name: "",
    image: "",
    isActive: true,
  });

  const { data: fruits = [], isLoading } = useQuery<Fruit[]>({
    queryKey: ["fruits"],
    queryFn: async () => {
      const res = await fetch("/api/fruits");
      return res.json();
    },
  });

  const addMutation = useMutation({
    mutationFn: (fruit: Fruit) =>
      fetch("/api/fruits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fruit),
      }).then((res) => res.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["fruits"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/fruits/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["fruits"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Fruit> }) =>
      fetch(`/api/fruits/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["fruits"] }),
  });

  const handleAdd = () => {
    if (!newFruit.name || !newFruit.image) return;
    addMutation.mutate(newFruit);
    setNewFruit({ name: "", image: "", isActive: true });
  };

  return (
    <Container>
      <h1>🍓 Fruits CRUD</h1>
      <Form>
        <input
          placeholder="Name"
          value={newFruit.name}
          onChange={(e) => setNewFruit({ ...newFruit, name: e.target.value })}
        />
        <input
          placeholder="Image URL"
          value={newFruit.image}
          onChange={(e) => setNewFruit({ ...newFruit, image: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={newFruit.isActive}
            onChange={(e) =>
              setNewFruit({ ...newFruit, isActive: e.target.checked })
            }
          />
          Active
        </label>
        <button onClick={handleAdd}>Add</button>
      </Form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Grid>
          {fruits.map((fruit) => (
            <Card key={fruit.id}>
              <img src={fruit.image} alt={fruit.name} />
              <h3>{fruit.name}</h3>
              <Status $active={fruit.isActive}>
                {fruit.isActive ? "Active" : "Inactive"}
              </Status>
              <Actions>
                <button
                  onClick={() =>
                    updateMutation.mutate({
                      id: fruit?.id!,
                      data: { isActive: !fruit.isActive },
                    })
                  }
                >
                  Toggle
                </button>
                <button onClick={() => deleteMutation.mutate(fruit?.id!)}>
                  Delete
                </button>
              </Actions>
            </Card>
          ))}
        </Grid>
      )}
    </Container>
  );
}
