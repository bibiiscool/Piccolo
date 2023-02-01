#pragma once

#include "runtime/function/framework/component/component.h"
#include "runtime/function/framework/object/object.h"

namespace Piccolo
{
    REFLECTION_TYPE(NameComponent)
    CLASS(NameComponent : public Component, WhiteListFields)
    {
        REFLECTION_BODY(NameComponent)

    public:
        NameComponent() = default;

        std::string    getName() const { return m_name; }

    protected:
        META(Enable)
        std::string m_name;
    };
} // namespace Piccolo
