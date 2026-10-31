import { z } from 'zod';
/** A service's answer to `GET <source.path>`. Row ids and control ids are each unique. */
export declare const guestStatusViewSchema: z.ZodObject<{
    rows: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        kind: z.ZodLiteral<"line">;
        id: z.ZodString;
        label: z.ZodString;
        icon: z.ZodOptional<z.ZodString>;
        dot: z.ZodOptional<z.ZodEnum<{
            accent: "accent";
            default: "default";
            error: "error";
            info: "info";
            muted: "muted";
            success: "success";
            warning: "warning";
        }>>;
        content: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
            kind: z.ZodLiteral<"bar">;
            value: z.ZodNumber;
            tone: z.ZodOptional<z.ZodEnum<{
                accent: "accent";
                default: "default";
                error: "error";
                info: "info";
                muted: "muted";
                success: "success";
                warning: "warning";
            }>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"chart">;
            values: z.ZodArray<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            tone: z.ZodOptional<z.ZodEnum<{
                accent: "accent";
                default: "default";
                error: "error";
                info: "info";
                muted: "muted";
                success: "success";
                warning: "warning";
            }>>;
            unit: z.ZodOptional<z.ZodEnum<{
                bytes: "bytes";
                count: "count";
                percent: "percent";
            }>>;
            step: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"chips">;
            chips: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                label: z.ZodString;
                tone: z.ZodOptional<z.ZodEnum<{
                    accent: "accent";
                    default: "default";
                    error: "error";
                    info: "info";
                    muted: "muted";
                    success: "success";
                    warning: "warning";
                }>>;
                url: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"text">;
            text: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<{
                accent: "accent";
                default: "default";
                error: "error";
                info: "info";
                muted: "muted";
                success: "success";
                warning: "warning";
            }>>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"segmented">;
            id: z.ZodString;
            label: z.ZodString;
            value: z.ZodString;
            options: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                label: z.ZodString;
            }, z.core.$strict>>;
            disabled: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>]>>;
        value: z.ZodOptional<z.ZodString>;
        valueTone: z.ZodOptional<z.ZodEnum<{
            accent: "accent";
            default: "default";
            error: "error";
            info: "info";
            muted: "muted";
            success: "success";
            warning: "warning";
        }>>;
        badge: z.ZodOptional<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<{
                accent: "accent";
                default: "default";
                error: "error";
                info: "info";
                muted: "muted";
                success: "success";
                warning: "warning";
            }>>;
        }, z.core.$strict>>;
        tooltip: z.ZodOptional<z.ZodString>;
        actions: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
            kind: z.ZodLiteral<"button">;
            id: z.ZodString;
            label: z.ZodString;
            variant: z.ZodOptional<z.ZodEnum<{
                default: "default";
                destructive: "destructive";
                outline: "outline";
            }>>;
            confirm: z.ZodOptional<z.ZodString>;
            disabled: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"switch">;
            id: z.ZodString;
            label: z.ZodString;
            checked: z.ZodBoolean;
            disabled: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>, z.ZodObject<{
            kind: z.ZodLiteral<"select">;
            id: z.ZodString;
            label: z.ZodString;
            value: z.ZodString;
            options: z.ZodArray<z.ZodObject<{
                value: z.ZodString;
                label: z.ZodString;
            }, z.core.$strict>>;
            disabled: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>]>>>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"note">;
        id: z.ZodString;
        text: z.ZodString;
        tone: z.ZodOptional<z.ZodEnum<{
            error: "error";
            info: "info";
            muted: "muted";
            warning: "warning";
        }>>;
    }, z.core.$strict>]>>;
    controls: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"button">;
        id: z.ZodString;
        label: z.ZodString;
        disabled: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>, z.ZodObject<{
        kind: z.ZodLiteral<"select">;
        id: z.ZodString;
        label: z.ZodString;
        value: z.ZodString;
        options: z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            label: z.ZodString;
        }, z.core.$strict>>;
        disabled: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>], "kind">>>;
}, z.core.$strict>;
