---
id: add-create-page
title: 4. Adding Create Page
tutorial:
    order: 0
    prev: tutorial/adding-crud-pages/{preferredUI}/add-show-page
    next: tutorial/adding-crud-pages/{preferredUI}/add-delete-feature
---

Create page is the page where you can create the record. In this tutorial, we will create the create page for the `blog_posts` resource.

## Creating Create Page

First, let's create our file under the `src/pages/blog-posts` folder. We will name it `create.tsx`. Then, we will copy the create page code generated by Inferencer and paste it into the file.

To copy the code and paste it into the file, follow the steps below:

1. Navigate to the <a href="http://localhost:3000/blog-posts" rel="noopener noreferrer nofollow">localhost:3000/blog-posts</a> in your browser.

2. To open the create page, click the "Create" button in the top right corner of the table.

3. On the create page, click on the "Show Code" button in the bottom right corner of the page.

4. You can see the create page code generated by Inferencer. Click on the "Copy" button to copy the code.

5. Paste the code into the you created, `create.tsx` file.

You can see the create page code generated by Inferencer below:

```tsx live previewOnly previewHeight=600px url=http://localhost:3000/blog-posts/create
setInitialRoutes(["/blog-posts/create"]);

import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
    MantineProvider,
    Global,
    NotificationsProvider,
    notificationProvider,
    LightTheme,
    Layout,
    ReadyPage,
    ErrorComponent,
} from "@pankod/refine-mantine";
import { MantineInferencer } from "@pankod/refine-inferencer/mantine";

const App = () => {
    return (
        <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    Layout={Layout}
                    resources={[
                        {
                            name: "blog_posts",
                            list: MantineInferencer,
                            show: MantineInferencer,
                            create: MantineInferencer,
                            edit: MantineInferencer,
                        },
                    ]}
                />
            </NotificationsProvider>
        </MantineProvider>
    );
};

render(<App />);
```

Instead of coding the create page component from scratch, Inferencer've created the required code base on API response, so that we can customize.

## Understanding the Create Component

We will go through the create page components and hooks one by one.

-   `<Create/>` is a **refine** component that is used to presentation purposes like showing the title of the page, save button etc.

    [Refer to the `<Create/>` documentation for more information &#8594](/docs/api-reference/mantine/components/basic-views/create)

-   `useForm` hook, imported from `@pankod/refine-mantine` package, has been developed by using the **Mantine** `useForm` hook and `@pankod/refine-core` `useForm` hook. It is used to handle the form state and form submission.

    It also provides the `saveButtonProps` prop that we can pass to the submit button of the form.

    When you use `useForm` in the edit page,it sends the form data to `dataProvider`'s `create` method when the form is submitted.

    [Refer to the `useForm` documentation for more information &#8594](https://refine.dev/docs/api-reference/mantine/hooks/form/useForm/)

    [Refer to the **Mantine** documentation for more information &#8594](https://mantine.dev/form/use-form/)

-   All other components provided by **Mantine** are used to display the form fields.

    [Refer to the Mantine documentation for more information &#8594](https://mantine.dev/)

### Handling Relationships

In the create page, we may need to select a record from another resource. For example, we may need to select a category from the `categories` resource to assign the blog post to the category. In this case, we can use the `useSelect` hook provided by **refine**. This hook fetches the data by passing the resource name to the `dataProvider`'s `getList` method. Then, it returns the `options` to be used in the `<Select/>` component.

[Refer to the `useSelect` documentation for more information &#8594](/docs/api-reference/mantine/hooks/useSelect/)

[Refer to the **Mantine** `<Select/>` documentation for more information &#8594](https://mantine.dev/core/select/)

In the auto-generated create page code, Inferencer used the `useSelect` hook to select a category from the `categories` resource like below:

```tsx
const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
});
```

## Adding the Create Page to the App

Now that we have created the create page, we need to add it to the `App.tsx` file.

1. Open `src/App.tsx` file on your editor.

2. Import the created `BlogPostCreate` component.

3. Replace the `MantineInferencer` component with the `BlogPostCreate` component.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
    MantineProvider,
    Global,
    NotificationsProvider,
    notificationProvider,
    LightTheme,
    Layout,
    ReadyPage,
    ErrorComponent,
} from "@pankod/refine-mantine";
import { MantineInferencer } from "@pankod/refine-inferencer/mantine";

import { BlogPostList } from "pages/blog-posts/list";
import { BlogPostEdit } from "pages/blog-posts/edit";
import { BlogPostShow } from "pages/blog-posts/show";
//highlight-next-line
import { BlogPostCreate } from "pages/blog-posts/create";

const App = () => {
    return (
        <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    Layout={Layout}
                    resources={[
                        {
                            name: "blog_posts",
                            list: BlogPostList,
                            edit: BlogPostEdit,
                            show: BlogPostShow,
                            /highlight-next-line
                            create: BlogPostCreate,
                        },
                    ]}
                />
            </NotificationsProvider>
        </MantineProvider>
    );
};
export default App;
```

Now, we can see the create page in the browser at <a href="http://localhost:3000/blog-posts/create" rel="noopener noreferrer nofollow">localhost:3000/blog-posts/create</a>

<br/>
<br/>

<Checklist>

<ChecklistItem id="add-create-page-mantine">
I added the create page to the app.
</ChecklistItem>
<ChecklistItem id="add-create-page-mantine-2">
I understood the create page components and hooks.
</ChecklistItem>
<ChecklistItem id="add-create-page-mantine-3">
I understood the relationship handling.
</ChecklistItem>

</Checklist>