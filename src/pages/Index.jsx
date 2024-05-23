import { useState, useEffect } from "react";
import { Container, Text, VStack, Grid, GridItem, Input, Button, Box } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jjfebbwwtcxyhvnkuyrh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec";
const supabase = createClient(supabaseUrl, supabaseKey);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data } = await supabase.from("notes").select("*");
    setNotes(data);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Input
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button colorScheme="teal" width="100%">Create New Note</Button>
        <Grid templateColumns="repeat(3, 1fr)" gap={6} width="100%">
          {filteredNotes.map(note => (
            <GridItem key={note.id} w="100%" h="100px" bg="gray.100" p={4} borderRadius="md">
              <Text fontWeight="bold">{note.title}</Text>
              <Text noOfLines={2}>{note.content}</Text>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Container>
  );
};

export default Index;