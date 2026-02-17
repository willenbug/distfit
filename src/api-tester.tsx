import React, { useRef } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';

export function ApiTester() {
  const responseInputRef = useRef<HTMLTextAreaElement>(null);

  const testEndpoint = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const endpoint = formData.get('endpoint') as string;
      const url = new URL(endpoint, location.href);
      const method = formData.get('method') as string;
      const response = await fetch(url, { method });

      const data: unknown = await response.json();
      responseInputRef.current!.value = JSON.stringify(data, null, 2);
    } catch (error) {
      responseInputRef.current!.value = String(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form className="flex items-center gap-2" onSubmit={testEndpoint}>
        <Label className="sr-only" htmlFor="method">
          Method
        </Label>
        <Select defaultValue="GET" name="method">
          <SelectTrigger className="w-[100px]" id="method">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
          </SelectContent>
        </Select>
        <Label className="sr-only" htmlFor="endpoint">
          Endpoint
        </Label>
        <Input
          defaultValue="/api/hello"
          id="endpoint"
          name="endpoint"
          placeholder="/api/hello"
          type="text"
        />
        <Button type="submit" variant="secondary">
          Send
        </Button>
      </form>
      <Label className="sr-only" htmlFor="response">
        Response
      </Label>
      <Textarea
        ref={responseInputRef}
        readOnly
        className="min-h-[140px] font-mono resize-y"
        id="response"
        placeholder="Response will appear here..."
      />
    </div>
  );
}
