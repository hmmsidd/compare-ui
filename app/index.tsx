import React, { useState } from 'react';
import { FlatList } from 'react-native';
import {
  GluestackUIProvider,
  config,
  Box,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  IconButton,
  Icon,
  Divider,
} from '@gluestack-ui/themed';
import { TrashIcon } from 'lucide-react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]); // <-- This will work if TS is set up correctly

  const addTask = () => {
    if (task.trim()) {
      setTasks((prev) => [...prev, task]);
      setTask('');
    }
  };

  const deleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <GluestackUIProvider config={config}>
      <Box flex={1} bg="$coolGray100" p="$4" pt="$10">
       
        <Text fontSize={24} fontWeight="bold" mb={16}>
          📝 My To-Do List
        </Text>

        }
        <HStack space="sm" mb="$4">
          <Input
            flex={1}
            placeholder="Enter task..."
            value={task}
            onChangeText={setTask}
          />
          <Button onPress={addTask}>
            <Button>Add</Button>
          </Button>
        </HStack>

       
        <FlatList
          data={tasks}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={
            <Text color="$coolGray600" textAlign="center" mt="$8">
              No tasks yet. Add your first one! ✨
            </Text>
          }
          renderItem={({ item, index }) => (
            <Box
              bg="$white"
              p="$3"
              mb="$3"
              rounded="$md"
              borderWidth={1}
              borderColor="$coolGray300"
              shadowColor="$black"
              shadowOpacity={0.05}
              shadowRadius={4}
            >
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$md">{item}</Text>
                <IconButton
                  icon={<Icon as={TrashIcon} color="$red600" size="md" />}
                  onPress={() => deleteTask(index)}
                  variant="ghost"
                />
              </HStack>
            </Box>
          )}
        />

      
        <Divider my="$3" />
        <Text textAlign="center" mt="auto" color="$gray600" fontStyle="italic">
          “Doing your daily goals makes you one step ahead.” 🚀
        </Text>
      </Box>
    </GluestackUIProvider>
  );
}
